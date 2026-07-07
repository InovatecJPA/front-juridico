import {
  Movement,
  PaginatedResponse,
  ProcessDetail,
  ProcessSummary,
} from "../types";

const DEFAULT_REVALIDATE_SECONDS = 60;

function getApiBaseUrl() {
  const rawBaseUrl =
    process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

  if (!rawBaseUrl) {
    throw new Error(
      "Defina API_URL ou NEXT_PUBLIC_API_URL para conectar o frontend ao backend."
    );
  }

  return rawBaseUrl.endsWith("/") ? rawBaseUrl : `${rawBaseUrl}/`;
}

function buildApiUrl(
  path: string,
  searchParams?: Record<string, string | number | undefined>
) {
  const normalizedPath = path.replace(/^\/+/, "");
  const url = new URL(normalizedPath, getApiBaseUrl());

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url;
}

export function buildExternalAttachmentUrl(path: string) {
  const apiBaseUrl = new URL(getApiBaseUrl());

  try {
    const attachmentUrl = new URL(path);
    const normalizedPath = `${attachmentUrl.pathname}${attachmentUrl.search}`;

    return new URL(normalizedPath, apiBaseUrl);
  } catch {
    return buildApiUrl(path);
  }
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: string
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

const API_UNAVAILABLE_MESSAGE =
  "Nao conseguimos carregar os dados agora. Tente novamente em instantes.";

function isConnectivityErrorMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  return (
    normalizedMessage.includes("fetch failed") ||
    normalizedMessage.includes("failed to fetch") ||
    normalizedMessage.includes("networkerror") ||
    normalizedMessage.includes("network error") ||
    normalizedMessage.includes("econnrefused") ||
    normalizedMessage.includes("enotfound") ||
    normalizedMessage.includes("etimedout") ||
    normalizedMessage.includes("socket hang up")
  );
}

function isHtmlResponseText(value: string) {
  const normalizedValue = value.trim().toLowerCase();

  return (
    normalizedValue.startsWith("<!doctype html") ||
    normalizedValue.startsWith("<html") ||
    normalizedValue.includes("<body")
  );
}

function isUnavailableErrorDetails(details?: string) {
  if (!details) {
    return false;
  }

  const normalizedDetails = details.toLowerCase();

  return (
    isHtmlResponseText(details) ||
    normalizedDetails.includes("err_ngrok_3200") ||
    normalizedDetails.includes("endpoint") && normalizedDetails.includes("offline") ||
    normalizedDetails.includes("ngrok")
  );
}

async function parseErrorDetails(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = (await response.json()) as { message?: string; error?: string };
    return json.message ?? json.error ?? JSON.stringify(json);
  }

  return response.text();
}

async function fetchFromApi<T>(
  path: string,
  options?: {
    revalidate?: number;
    searchParams?: Record<string, string | number | undefined>;
  }
) {
  const response = await fetch(buildApiUrl(path, options?.searchParams), {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    next: {
      revalidate: options?.revalidate ?? DEFAULT_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    const details = await parseErrorDetails(response);

    throw new ApiClientError(
      `Erro ${response.status} ao consultar ${path}.`,
      response.status,
      details
    );
  }

  return (await response.json()) as T;
}

export function getPublicApiBaseUrl() {
  return getApiBaseUrl();
}

export function getProcesses(
  origin: "tce" | "tjpb",
  page = 1,
  limit = 10
) {
  return fetchFromApi<PaginatedResponse<ProcessSummary>>(`processes/${origin}`, {
    searchParams: { page, limit },
  });
}

export function getTceProcesses(page = 1, limit = 10) {
  return getProcesses("tce", page, limit);
}

export function getTjpbProcesses(page = 1, limit = 10) {
  return getProcesses("tjpb", page, limit);
}

export function getProcessDetail(id: string) {
  return fetchFromApi<ProcessDetail>(`processes/${id}`);
}

export function getProcessMovements(id: string, page = 1, limit = 10) {
  return fetchFromApi<PaginatedResponse<Movement>>(
    `processes/${id}/movements`,
    {
      searchParams: { page, limit },
    }
  );
}

export function getApiErrorMessage(error: unknown) {
  if (error instanceof ApiClientError) {
    if (error.status >= 500 || isUnavailableErrorDetails(error.details)) {
      return API_UNAVAILABLE_MESSAGE;
    }

    return error.details ?? error.message;
  }

  if (error instanceof Error) {
    if (isConnectivityErrorMessage(error.message)) {
      return API_UNAVAILABLE_MESSAGE;
    }

    return error.message;
  }

  return API_UNAVAILABLE_MESSAGE;
}
