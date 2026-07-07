import { NextRequest, NextResponse } from "next/server";
import { buildExternalAttachmentUrl } from "@/feature/processes/api/server";

function buildDownloadHeaders(response: Response, fallbackFileName: string) {
  const headers = new Headers();
  const contentType = response.headers.get("content-type");
  const contentLength = response.headers.get("content-length");
  const contentDisposition = response.headers.get("content-disposition");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  if (contentLength) {
    headers.set("content-length", contentLength);
  }

  headers.set(
    "content-disposition",
    contentDisposition ?? `inline; filename="${fallbackFileName}"`
  );

  return headers;
}

function getFallbackFileName(path: string) {
  const segments = path.split("/").filter(Boolean);
  return segments.at(-1) ?? "anexo.pdf";
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { error: "Anexo nao informado para download." },
      { status: 400 }
    );
  }

  let response: Response;

  try {
    const attachmentUrl = buildExternalAttachmentUrl(path);
    response = await fetch(attachmentUrl, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "Nao foi possivel baixar o anexo no momento." },
      { status: 502 }
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "Nao foi possivel baixar o anexo no momento." },
      { status: response.status }
    );
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers: buildDownloadHeaders(response, getFallbackFileName(path)),
  });
}
