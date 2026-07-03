import { NextRequest, NextResponse } from "next/server";
import {
  ApiClientError,
  getApiErrorMessage,
  getProcessMovements,
} from "@/feature/processes/api/server";

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const page = parsePositiveInt(request.nextUrl.searchParams.get("page"), 1);
  const limit = parsePositiveInt(request.nextUrl.searchParams.get("limit"), 10);

  try {
    const response = await getProcessMovements(id, page, limit);
    return NextResponse.json(response);
  } catch (error) {
    const status = error instanceof ApiClientError ? error.status : 502;

    return NextResponse.json(
      { error: getApiErrorMessage(error) },
      { status }
    );
  }
}
