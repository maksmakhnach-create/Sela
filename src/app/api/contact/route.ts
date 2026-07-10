import { NextResponse } from "next/server";
import { handleContactRequest } from "@/lib/telegram-contact";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const response = await handleContactRequest(request);
  const body = await response.json();

  return NextResponse.json(body, { status: response.status });
}
