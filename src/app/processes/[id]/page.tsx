"use client";

import React, { use } from "react";
import Link from "next/link";
import { useProcessDetail, useProcessMovements } from "@/feature/processes/hooks";
import ProcessDetailView from "@/feature/processes/components/ProcessDetailView";
import MovementsTimeline from "@/feature/processes/components/MovementsTimeline";
import { Icons } from "@/shared/components/icons";
import { DetailSkeleton, ErrorState } from "@/shared/components/states";
import { Card, CardHeader, CardContent, CardTitle } from "@/shared/components/card";

export default function ProcessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    data: process,
    loading: detailLoading,
    error: detailError,
    retry: retryDetail,
  } = useProcessDetail(id);

  const {
    data: movements,
    loading: movementsLoading,
    error: movementsError,
    retry: retryMovements,
  } = useProcessMovements(id);

  // Determinar link de retorno com base no ID do tribunal
  const getBackLink = () => {
    if (id.startsWith("tce-")) return "/processes/tce";
    if (id.startsWith("tjpb-")) return "/processes/tjpb";
    return "/";
  };

  const backLinkText = () => {
    if (id.startsWith("tce-")) return "Voltar para Processos TCE";
    if (id.startsWith("tjpb-")) return "Voltar para Processos TJPB";
    return "Voltar para o Painel";
  };

  const handleRetryAll = () => {
    retryDetail();
    retryMovements();
  };

  return (
    <div className="space-y-6">
      {/* Botão de Voltar */}
      <div className="flex items-center">
        <Link
          href={getBackLink()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <Icons.ArrowLeft size={16} />
          {backLinkText()}
        </Link>
      </div>

      {/* Seção 1: Detalhes do Processo */}
      {detailLoading ? (
        <Card hoverEffect={false} className="p-6">
          <DetailSkeleton />
        </Card>
      ) : detailError || !process ? (
        <ErrorState
          onRetry={handleRetryAll}
          message={detailError || "Não foi possível carregar os detalhes deste processo."}
        />
      ) : (
        <ProcessDetailView process={process} />
      )}

      {/* Seção 2: Movimentações (Histórico) */}
      <Card hoverEffect={false}>
        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="text-zinc-500 dark:text-zinc-400">
              <Icons.Clock size={20} />
            </div>
            <CardTitle>Histórico de Movimentações</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {movementsLoading && !detailLoading ? (
            <div className="space-y-4 py-4">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/3 animate-pulse" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-2/3 animate-pulse" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/2 animate-pulse" />
            </div>
          ) : movementsError ? (
            <div className="py-2 text-center">
              <p className="text-sm text-rose-600 dark:text-rose-400 font-semibold">
                Falha ao carregar as movimentações do processo.
              </p>
              <button
                onClick={retryMovements}
                className="mt-3 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Tentar carregar movimentações novamente
              </button>
            </div>
          ) : (
            <MovementsTimeline movements={movements} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
