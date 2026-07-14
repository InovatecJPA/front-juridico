import React from "react";
import { Movement } from "../types";
import { Icons } from "@/shared/components/icons";
import { EmptyState } from "@/shared/components/states";

interface MovementsTimelineProps {
  movements: Movement[];
}

function buildAttachmentUrl(path: string) {
  const url = new URL("/api/processes/attachments", "http://localhost");
  url.searchParams.set("path", path);

  return `${url.pathname}${url.search}`;
}

export default function MovementsTimeline({
  movements,
}: MovementsTimelineProps) {
  if (movements.length === 0) {
    return (
      <EmptyState
        title="Nenhuma movimentação registrada"
        description="Este processo ainda não possui histórico de andamentos cadastrado."
        icon={<Icons.Clock size={32} />}
      />
    );
  }

  return (
    <div className="relative pl-6 border-l border-zinc-200 dark:border-zinc-800 ml-4 space-y-8 my-4">
      {movements.map((movement, index) => {
        const dateObj = new Date(movement.dataMovimentacao);
        const dateFormatted = dateObj.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const timeFormatted = dateObj.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={movement.id} className="relative">
            <span
              className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                index === 0
                  ? "bg-indigo-600 border-indigo-600 dark:bg-indigo-400 dark:border-indigo-400 ring-4 ring-indigo-500/20"
                  : "bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700"
              }`}
            />

            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3 max-w-3xl">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {movement.titulo}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Movimento #{movement.id.slice(0, 8)}
                  </p>
                </div>

                {movement.temAnexo && movement.anexos.length > 0 && (
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Anexos
                    </p>

                    <div className="mt-2 flex flex-col gap-2">
                      {movement.anexos.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={buildAttachmentUrl(attachment.linkAnexo)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          <Icons.FileText size={14} />
                          {attachment.linkAnexo}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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
