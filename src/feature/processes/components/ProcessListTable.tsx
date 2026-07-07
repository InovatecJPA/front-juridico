"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PaginatedResponse, ProcessOrigin, ProcessSummary } from "../types";
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/components/table";
import { Badge } from "@/shared/components/badge";
import { Icons } from "@/shared/components/icons";
import { EmptyState } from "@/shared/components/states";

interface ProcessListTableProps {
  tribunal: ProcessOrigin;
  processes: ProcessSummary[];
  pagination: PaginatedResponse<ProcessSummary>;
  basePath: string;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR");
}

export default function ProcessListTable({
  tribunal,
  processes,
  pagination,
  basePath,
}: ProcessListTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProcesses = processes.filter((process) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    return (
      process.numero.toLowerCase().includes(term) ||
      process.origem.toLowerCase().includes(term) ||
      formatDate(process.dataPublicacao).includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.limit));
  const canGoBack = pagination.page > 1;
  const canGoForward = pagination.page < totalPages;

  const buildPageHref = (page: number) =>
    `${basePath}?page=${page}&limit=${pagination.limit}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex w-full items-center max-w-md">
          <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
            <Icons.Search size={18} />
          </div>
          <input
            type="text"
            placeholder={`Buscar ${tribunal} por número, origem ou data`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 shadow-xs"
          />
        </div>

        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            {pagination.total}
          </span>{" "}
          processos encontrados
          <span className="mx-2 text-zinc-300 dark:text-zinc-700">|</span>
          Página {pagination.page} de {totalPages}
        </div>
      </div>

      {filteredProcesses.length === 0 ? (
        <EmptyState
          title="Nenhum processo encontrado"
          description={
            searchTerm
              ? `Nenhum item desta página corresponde a "${searchTerm}".`
              : `Não há processos disponíveis na página atual do ${tribunal}.`
          }
        />
      ) : (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Data de publicação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcesses.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-50">
                    {process.numero}
                  </TableCell>
                  <TableCell>
                    <Badge status={process.origem} />
                  </TableCell>
                  <TableCell className="text-zinc-500 dark:text-zinc-400">
                    {formatDate(process.dataPublicacao)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/processes/${process.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 active:scale-95 transition-all"
                    >
                      Visualizar
                      <Icons.ChevronRight size={14} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="flex flex-col gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          O filtro de busca atua apenas sobre os resultados carregados nesta página.
        </p>

        <div className="flex items-center gap-2">
          {canGoBack ? (
            <Link
              href={buildPageHref(pagination.page - 1)}
              className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Página anterior
            </Link>
          ) : (
            <span className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-400 dark:text-zinc-600">
              Página anterior
            </span>
          )}

          {canGoForward ? (
            <Link
              href={buildPageHref(pagination.page + 1)}
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
      </div>
    </div>
  );
}
