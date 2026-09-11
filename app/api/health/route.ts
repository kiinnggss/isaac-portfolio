import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  const dbHealth = await db.checkHealth();
  const responseTimeMs = Date.now() - startTime;

  const healthData = {
    status: dbHealth.connected ? "operational" : "degraded",
    service: "Gbodimowo Isaac Portfolio Engine",
    version: "2.0.0",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: {
      provider: "sqlite",
      connected: dbHealth.connected,
      latencyMs: responseTimeMs,
      totalMessages: dbHealth.messageCount,
      error: dbHealth.error || null,
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memoryUsageMb: {
        rss: Math.round(process.memoryUsage().rss / (1024 * 1024)),
        heapUsed: Math.round(process.memoryUsage().heapUsed / (1024 * 1024)),
        heapTotal: Math.round(process.memoryUsage().heapTotal / (1024 * 1024)),
      },
    },
  };

  return NextResponse.json(healthData, {
    status: dbHealth.connected ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
