import { NextRequest, NextResponse } from "next/server";
import { subnetQuerySchema } from "@/lib/schema";
import { calculateSubnet } from "@/lib/network-utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cidrParam = searchParams.get("cidr") || "192.168.10.0/24";

    const parsed = subnetQuerySchema.safeParse({ cidr: cidrParam });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid CIDR parameter", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const result = calculateSubnet(parsed.data.cidr);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Subnet Calculation Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = subnetQuerySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid CIDR payload", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const result = calculateSubnet(parsed.data.cidr);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Subnet Calculation Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
