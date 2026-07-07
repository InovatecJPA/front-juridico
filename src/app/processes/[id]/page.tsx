import Link from "next/link";
import { notFound } from "next/navigation";
import ProcessDetailView from "@/feature/processes/components/ProcessDetailView";
import MovementsTimeline from "@/feature/processes/components/MovementsTimeline";
import {
  ApiClientError,
  getApiErrorMessage,
  getProcessDetail,
  getProcessMovements,
} from "@/feature/processes/api/server";
import { Icons } from "@/shared/components/icons";
import { ErrorState } from "@/shared/components/states";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/shared/components/card";

const MOVEMENTS_PAGE_SIZE = 10;

function getPageParam(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(rawValue ?? "1", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function ProcessDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const movementsPage = getPageParam(resolvedSearchParams.movementsPage);

  let process;

  try {
    process = await getProcessDetail(id);
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      notFound();
    }

    return (
      <ErrorState
        title="Erro ao carregar detalhes do processo"
        message={getApiErrorMessage(error)}
      />
    );
  }

  const movementsResult = await getProcessMovements(
    id,
    movementsPage,
    MOVEMENTS_PAGE_SIZE
  ).catch((error) => ({
    error: getApiErrorMessage(error),
  }));

  const backLink =
    process.origem === "TCE-PB" ? "/processes/tce" : "/processes/tjpb";
  const backLinkText =
    process.origem === "TCE-PB"
      ? "Voltar para processos do TCE-PB"
      : "Voltar para processos do TJPB";

  const movementsPageCount =
    "data" in movementsResult
      ? Math.max(1, Math.ceil(movementsResult.total / movementsResult.limit))
      : 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <Icons.ArrowLeft size={16} />
          {backLinkText}
        </Link>
      </div>

      <ProcessDetailView process={process} />

      <Card hoverEffect={false}>
        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="text-zinc-500 dark:text-zinc-400">
              <Icons.Clock size={20} />
            </div>
            <div>
              <CardTitle>Histórico de movimentações</CardTitle>
              {"data" in movementsResult && (
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Página {movementsResult.page} de {movementsPageCount} com{" "}
                  {movementsResult.total} movimentações registradas.
                </p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {"error" in movementsResult ? (
            <ErrorState
              title="Falha ao carregar movimentações"
              message={movementsResult.error}
            />
          ) : (
            <>
              <MovementsTimeline movements={movementsResult.data} />

              <div className="mt-6 flex items-center justify-end gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                {movementsResult.page > 1 ? (
                  <Link
                    href={`/processes/${id}?movementsPage=${movementsResult.page - 1}`}
                    className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  >
                    Página anterior
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-400 dark:text-zinc-600">
                    Página anterior
                  </span>
                )}

                {movementsResult.page < movementsPageCount ? (
                  <Link
                    href={`/processes/${id}?movementsPage=${movementsResult.page + 1}`}
                    className="inline-flex items-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    Próxima página
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-lg bg-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
                    Próxima página
                  </span>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
