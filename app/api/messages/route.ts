import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const messages = await db.messages.findMany(100);
    const total = await db.messages.count();
    const pendingCount = messages.filter((m) => m.status === "pending").length;
    const repliedCount = messages.filter((m) => m.status === "replied").length;

    return NextResponse.json({
      success: true,
      total,
      pendingCount,
      repliedCount,
      messages,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to load messages";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !["pending", "replied", "flagged"].includes(status)) {
      return NextResponse.json({ error: "Invalid ID or status" }, { status: 400 });
    }

    const updated = await db.messages.updateStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update status";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
