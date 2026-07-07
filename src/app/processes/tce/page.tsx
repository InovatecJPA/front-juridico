import ProcessListTable from "@/feature/processes/components/ProcessListTable";
import {
  getApiErrorMessage,
  getTceProcesses,
} from "@/feature/processes/api/server";
import { ErrorState } from "@/shared/components/states";

const PAGE_SIZE = 10;

function getPageParam(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(rawValue ?? "1", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function TceProcessesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = getPageParam(params.page);
  let response;

  try {
    response = await getTceProcesses(page, PAGE_SIZE);
  } catch (error) {
    return (
      <ErrorState
        message={getApiErrorMessage(error)}
        title="Erro ao carregar processos do TCE-PB"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Tribunal de Contas da Paraíba (TCE-PB)
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          Listagem paginada conectada à API real para consulta dos processos do
          TCE-PB.
        </p>
      </div>

      <ProcessListTable
        tribunal="TCE-PB"
        processes={response.data}
        pagination={response}
        basePath="/processes/tce"
      />
    </div>
  );
}
