"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TceProcess, TjpbProcess } from "../types";
import { TableContainer, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shared/components/table";
import { Badge } from "@/shared/components/badge";
import { Icons } from "@/shared/components/icons";
import { EmptyState } from "@/shared/components/states";

interface ProcessListTableProps {
  tribunal: "TCE" | "TJPB";
  processes: (TceProcess | TjpbProcess)[];
}

export default function ProcessListTable({ tribunal, processes }: ProcessListTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // filtragem 
  const filteredProcesses = processes.filter((proc) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    const matchNumero = proc.numero.toLowerCase().includes(term);
    const matchStatus = proc.status.toLowerCase().includes(term);

    if (tribunal === "TCE") {
      const tceProc = proc as TceProcess;
      return (
        matchNumero ||
        matchStatus ||
        tceProc.relator.toLowerCase().includes(term) ||
        tceProc.jurisdicionado.toLowerCase().includes(term) ||
        tceProc.tipo.toLowerCase().includes(term)
      );
    } else {
      const tjpbProc = proc as TjpbProcess;
      return (
        matchNumero ||
        matchStatus ||
        tjpbProc.orgaoJulgador.toLowerCase().includes(term) ||
        tjpbProc.classe.toLowerCase().includes(term) ||
        tjpbProc.juiz.toLowerCase().includes(term) ||
        tjpbProc.partes.autor.toLowerCase().includes(term) ||
        tjpbProc.partes.reu.toLowerCase().includes(term)
      );
    }
  });

  return (
    <div className="space-y-4">
      {/* barra de busca */}
      <div className="relative flex items-center max-w-md">
        <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
          <Icons.Search size={18} />
        </div>
        <input
          type="text"
          placeholder={`Buscar processos por número, status, ${tribunal === "TCE" ? "relator, jurisdicionado..." : "partes, juiz, classe..."
            }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 shadow-xs"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs font-semibold"
          >
            Limpar
          </button>
        )}
      </div>

      {filteredProcesses.length === 0 ? (
        <EmptyState
          title="Nenhum processo encontrado"
          description={
            searchTerm
              ? `Nenhum processo no ${tribunal} corresponde à busca "${searchTerm}".`
              : `Não há processos disponíveis na lista do ${tribunal}.`
          }
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Processo</TableHead>
                {tribunal === "TCE" ? (
                  <>
                    <TableHead>Jurisdicionado</TableHead>
                    <TableHead>Relator</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Autuação</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Partes</TableHead>
                    <TableHead>Órgão Julgador</TableHead>
                    <TableHead>Assunto / Classe</TableHead>
                    <TableHead>Distribuição</TableHead>
                  </>
                )}
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcesses.map((proc) => {
                const isTce = tribunal === "TCE";

                // data
                const dateStr = proc.dataCadastro
                  ? new Date(proc.dataCadastro).toLocaleDateString("pt-BR")
                  : "-";

                return (
                  <TableRow key={proc.id}>
                    {/* numero do processo */}
                    <TableCell className="font-medium text-zinc-900 dark:text-zinc-50">
                      <div className="flex flex-col">
                        <span>{proc.numero}</span>
                        {proc.valor ? (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-0.5">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(proc.valor)}
                          </span>
                        ) : null}
                      </div>
                    </TableCell>

                    {/* TCE ou TJPB colunas específicas */}
                    {isTce ? (
                      <>
                        <TableCell className="max-w-[200px] truncate">
                          {(proc as TceProcess).jurisdicionado}
                        </TableCell>
                        <TableCell>{(proc as TceProcess).relator}</TableCell>
                        <TableCell className="max-w-[200px] truncate text-zinc-500 dark:text-zinc-400">
                          {(proc as TceProcess).tipo}
                        </TableCell>
                        <TableCell className="text-zinc-500 dark:text-zinc-400">{dateStr}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="max-w-[220px]">
                          <div className="flex flex-col text-xs space-y-0.5">
                            <span className="truncate">
                              <strong className="text-zinc-500 dark:text-zinc-400">Autor:</strong>{" "}
                              {(proc as TjpbProcess).partes.autor}
                            </span>
                            <span className="truncate">
                              <strong className="text-zinc-500 dark:text-zinc-400">Réu:</strong>{" "}
                              {(proc as TjpbProcess).partes.reu}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {(proc as TjpbProcess).orgaoJulgador}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                              Juiz: {(proc as TjpbProcess).juiz}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[180px] truncate text-zinc-500 dark:text-zinc-400">
                          {(proc as TjpbProcess).classe}
                        </TableCell>
                        <TableCell className="text-zinc-500 dark:text-zinc-400">{dateStr}</TableCell>
                      </>
                    )}

                    {/* Status Badge */}
                    <TableCell>
                      <Badge status={proc.status} />
                    </TableCell>

                    {/* botão para os detalhes */}
                    <TableCell className="text-right">
                      <Link
                        href={`/processes/${proc.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 active:scale-95 transition-all"
                      >
                        Visualizar
                        <Icons.ChevronRight size={14} />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
