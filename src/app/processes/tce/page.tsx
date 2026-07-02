"use client";

import React from "react";
import { useTceProcesses } from "@/feature/processes/hooks";
import ProcessListTable from "@/feature/processes/components/ProcessListTable";
import { TableSkeleton, ErrorState } from "@/shared/components/states";

export default function TceProcessesPage() {
  const { data, loading, error, retry } = useTceProcesses();

  return (
    <div className="space-y-6">
      {/* Cabeçalho de Título */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Tribunal de Contas da Paraíba (TCE-PB)
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
          Lista e consulta de prestações de contas, licitações, denúncias e acompanhamentos de gestão.
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
        <ProcessListTable tribunal="TCE" processes={data} />
      )}
    </div>
  );
}
