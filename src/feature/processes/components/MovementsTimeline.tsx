"use client";

import React from "react";
import { Movement } from "../types";
import { Icons } from "@/shared/components/icons";
import { EmptyState } from "@/shared/components/states";

interface MovementsTimelineProps {
  movements: Movement[];
}

export default function MovementsTimeline({ movements }: MovementsTimelineProps) {
  if (!movements || movements.length === 0) {
    return (
      <EmptyState
        title="Nenhuma movimentação registrada"
        description="Este processo ainda não possui histórico de andamentos ou movimentações cadastradas."
        icon={<Icons.Clock size={32} />}
      />
    );
  }

  // ordenar as movimentações pela data mais recente primeiro
  const sortedMovements = [...movements].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  return (
    <div className="relative pl-6 border-l border-zinc-200 dark:border-zinc-800 ml-4 space-y-8 my-4">
      {sortedMovements.map((mov, index) => {
        const dateObj = new Date(mov.data);
        const dateFormatted = dateObj.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const timeFormatted = dateObj.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const isLatest = index === 0;

        return (
          <div key={mov.id} className="relative">
            {/* Círculo indicador no eixo vertical */}
            <span
              className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${isLatest
                  ? "bg-indigo-600 border-indigo-600 dark:bg-indigo-400 dark:border-indigo-400 ring-4 ring-indigo-500/20"
                  : "bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700"
                }`}
            />

            {/* Conteúdo da movimentação */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div className="space-y-1 max-w-2xl">
                <h4
                  className={`text-sm font-semibold ${isLatest
                      ? "text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-800 dark:text-zinc-200"
                    }`}
                >
                  {mov.descricao}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Icons.Building size={14} />
                  {mov.responsavel}
                </p>
                {mov.detalhes && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2 bg-zinc-50 dark:bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                    {mov.detalhes}
                  </p>
                )}
              </div>

              {/* Data da movimentação */}
              <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 font-medium md:text-right shrink-0">
                <Icons.Calendar size={12} />
                <span>{dateFormatted}</span>
                <span className="text-zinc-300 dark:text-zinc-700 mx-1">•</span>
                <Icons.Clock size={12} />
                <span>{timeFormatted}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
