"use client";

import React from "react";
import { useTjpbProcesses } from "@/feature/processes/hooks";
import ProcessListTable from "@/feature/processes/components/ProcessListTable";
import { TableSkeleton, ErrorState } from "@/shared/components/states";

export default function TjpbProcessesPage() {
  const { data, loading, error, retry } = useTjpbProcesses();

  return (
    <div className="space-y-6">
      {/* Cabeçalho de Título */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Tribunal de Justiça da Paraíba (TJPB)
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
          Consulta processual unificada de processos cíveis, execuções judiciais e direito de família do TJPB.
        </p>
      </div>

      {/* Estados Visuais */}
      {loading ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
          <TableSkeleton rows={5} />
        </div>
      ) : error ? (
        <ErrorState onRetry={retry} message={error} />
      ) : (
        <ProcessListTable tribunal="TJPB" processes={data} />
      )}
    </div>
  );
}
