import { NextResponse } from "next/server";
import {
  ApiClientError,
  getApiErrorMessage,
  getProcessDetail,
} from "@/feature/processes/api/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const process = await getProcessDetail(id);
    return NextResponse.json(process);
  } catch (error) {
    const status = error instanceof ApiClientError ? error.status : 502;

    return NextResponse.json(
      { error: getApiErrorMessage(error) },
      { status }
    );
  }
}
