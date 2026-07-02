"use client";

import React from "react";
import { ProcessDetail, TceProcess, TjpbProcess } from "../types";
import { Card, CardContent } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";
import { Icons } from "@/shared/components/icons";

interface ProcessDetailViewProps {
  process: ProcessDetail;
}

export default function ProcessDetailView({ process }: ProcessDetailViewProps) {
  const isTce = process.tribunal === "TCE";

  const dateLabel = isTce ? "Data de Autuação" : "Data de Distribuição";
  const dateFormatted = process.dataCadastro
    ? new Date(process.dataCadastro).toLocaleDateString("pt-BR")
    : "-";

  const formattedValor = process.valor
    ? new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(process.valor)
    : "Não informado";

  return (
    <Card hoverEffect={false} className="overflow-hidden">
      {/* header */}
      <div className="bg-zinc-50 dark:bg-zinc-800/20 border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs text-zinc-600 dark:text-zinc-400">
            <Icons.ScaleBalance size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
                Processo {process.tribunal}
              </span>
              <Badge status={process.status} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
              {process.numero}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Icons.Calendar size={16} />
            <div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">{dateLabel}</p>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                {dateFormatted}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do Detalhe */}
      <CardContent className="p-6">
        <h3 className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase mb-4">
          Informações Principais
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lado Esquerdo */}
          <div className="space-y-4">
            <div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                Tribunal
              </span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Icons.Building size={16} className="text-zinc-400" />
                {process.tribunal === "TCE"
                  ? "Tribunal de Contas do Estado da Paraíba"
                  : "Tribunal de Justiça do Estado da Paraíba"}
              </span>
            </div>

            {isTce ? (
              <>
                {/* TCE: Jurisdicionado */}
                <div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                    Jurisdicionado
                  </span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <Icons.Briefcase size={16} className="text-zinc-400" />
                    {(process as TceProcess).jurisdicionado}
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* TJPB: Órgão Julgador */}
                <div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                    Órgão Julgador
                  </span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <Icons.Building size={16} className="text-zinc-400" />
                    {(process as TjpbProcess).orgaoJulgador}
                  </span>
                </div>
              </>
            )}

            <div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                Valor da Causa / Processo
              </span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {formattedValor}
              </span>
            </div>
          </div>

          {/* Lado Direito */}
          <div className="space-y-4">
            {isTce ? (
              <>
                {/* TCE: Relator */}
                <div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                    Conselheiro Relator
                  </span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <Icons.User size={16} className="text-zinc-400" />
                    {(process as TceProcess).relator}
                  </span>
                </div>

                {/* TCE: Tipo */}
                <div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                    Tipo do Processo
                  </span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <Icons.FileText size={16} className="text-zinc-400" />
                    {(process as TceProcess).tipo}
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* TJPB: Juiz */}
                <div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                    Magistrado / Juiz
                  </span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <Icons.User size={16} className="text-zinc-400" />
                    {(process as TjpbProcess).juiz}
                  </span>
                </div>

                {/* TJPB: Assunto / Classe */}
                <div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                    Classe Judicial / Assunto
                  </span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <Icons.FileText size={16} className="text-zinc-400" />
                    {(process as TjpbProcess).classe}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Exibir Partes (somente para TJPB) */}
        {!isTce && (
          <div className="border-t border-zinc-150 dark:border-zinc-800/80 mt-6 pt-6">
            <h3 className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase mb-4">
              Partes Envolvidas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider block mb-1">
                  Polo Ativo (Autor)
                </span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {(process as TjpbProcess).partes.autor}
                </span>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider block mb-1">
                  Polo Passivo (Réu)
                </span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {(process as TjpbProcess).partes.reu}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
