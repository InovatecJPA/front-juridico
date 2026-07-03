import { NextRequest, NextResponse } from "next/server";
import {
  getApiErrorMessage,
  getTceProcesses,
} from "@/feature/processes/api/server";

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: NextRequest) {
  const page = parsePositiveInt(request.nextUrl.searchParams.get("page"), 1);
  const limit = parsePositiveInt(request.nextUrl.searchParams.get("limit"), 10);

  try {
    const response = await getTceProcesses(page, limit);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: getApiErrorMessage(error) },
      { status: 502 }
    );
  }
}
