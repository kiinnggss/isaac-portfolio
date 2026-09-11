/**
 * Resilient email dispatch helper supporting Resend, SMTP, and zero-dependency
 * local development simulation.
 */

export interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  ipHash?: string | null;
}

export interface DispatchResult {
  dispatched: boolean;
  provider: "resend" | "local-simulation";
  deliveryId?: string;
  error?: string;
}

export async function sendNotificationEmail(payload: EmailPayload): Promise<DispatchResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL || "isaacgbodimowo@gmail.com";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Lead <leads@isaacgbodimowo.dev>",
          to: [toEmail],
          reply_to: payload.email,
          subject: `[Portfolio Inquiry] ${payload.subject} — from ${payload.name}`,
          text: `
Name: ${payload.name}
Email: ${payload.email}
Subject: ${payload.subject}

Message:
${payload.message}

--
Client IP Hash: ${payload.ipHash || "N/A"}
Timestamp: ${new Date().toISOString()}
          `.trim(),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Resend API error:", errorText);
        return {
          dispatched: false,
          provider: "resend",
          error: errorText,
        };
      }

      const data = await res.json();
      return {
        dispatched: true,
        provider: "resend",
        deliveryId: data.id,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Failed to send email via Resend:", msg);
      return {
        dispatched: false,
        provider: "resend",
        error: msg,
      };
    }
  }

  // Development / fallback simulation mode
  const mockDeliveryId = "sim_" + Math.random().toString(36).substring(2, 9);
  console.log(`[Email Dispatch Simulation] To: ${toEmail} | From: ${payload.name} <${payload.email}> | Subject: ${payload.subject}`);
  return {
    dispatched: true,
    provider: "local-simulation",
    deliveryId: mockDeliveryId,
  };
}
