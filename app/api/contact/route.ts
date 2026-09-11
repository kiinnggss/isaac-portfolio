import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { contactSchema } from "@/lib/schema";
import { sanitizeObject } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rate-limit";
import { db } from "@/lib/db";
import { sendNotificationEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip + (process.env.SALT || "isaac-salt-2026")).digest("hex").substring(0, 16);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Resolve client IP and rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";
    const ipFingerprint = hashIp(clientIp);

    // Limit to 5 contact attempts per 10 minutes (600,000 ms)
    const rateCheck = rateLimit(`contact:${ipFingerprint}`, 5, 600000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: "Too many messages sent. Please wait before submitting another inquiry.",
          retryAfter: rateCheck.resetSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.resetSeconds),
          },
        }
      );
    }

    // 2. Parse and validate payload
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 });
    }

    const validationResult = contactSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed",
          details: fieldErrors,
        },
        { status: 400 }
      );
    }

    // 3. Sanitize inputs
    const sanitizedData = sanitizeObject(validationResult.data);

    // 4. Extract metadata
    const userAgent = req.headers.get("user-agent") || "unknown";
    const referrer = req.headers.get("referer") || "direct";

    // 5. Store message in SQLite database
    const savedRecord = await db.messages.create({
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      status: "pending",
      ipHash: ipFingerprint,
      userAgent: userAgent.substring(0, 255),
      referrer: referrer.substring(0, 255),
    });

    // 6. Log analytics event
    await db.analytics.create({
      eventType: "contact_submission",
      path: "/#contact",
      meta: JSON.stringify({ subject: sanitizedData.subject, id: savedRecord.id }),
      ipHash: ipFingerprint,
    });

    // 7. Dispatch automated email notification
    const dispatchStatus = await sendNotificationEmail({
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      ipHash: ipFingerprint,
    });

    return NextResponse.json(
      {
        success: true,
        messageId: savedRecord.id,
        timestamp: savedRecord.createdAt,
        emailDispatched: dispatchStatus.dispatched,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error processing contact request:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
