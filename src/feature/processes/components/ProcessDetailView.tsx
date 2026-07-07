import React from "react";
import { ProcessDetail, ProcessParty } from "../types";
import { Card, CardContent } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";
import { Icons } from "@/shared/components/icons";

interface ProcessDetailViewProps {
  process: ProcessDetail;
}

function renderParticipants(participants: ProcessParty[]) {
  if (participants.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Nenhum participante encontrado nesta categoria.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {participants.map((party) => (
        <div
          key={party.participanteId}
          className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {party.participante.nome}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {party.qualificacao}
              </p>
            </div>

            {(party.participante.documento || party.participante.oab) && (
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {party.participante.documento ?? party.participante.oab}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProcessDetailView({ process }: ProcessDetailViewProps) {
  const publishedAt = new Date(process.dataPublicacao).toLocaleDateString("pt-BR");
  const activeParties = process.polosProcessos.filter(
    (party) => party.isPoloAtivo === true
  );
  const passiveParties = process.polosProcessos.filter(
    (party) => party.isPoloPassivo === true
  );
  const otherParties = process.polosProcessos.filter(
    (party) => party.isPoloAtivo !== true && party.isPoloPassivo !== true
  );

  return (
    <Card hoverEffect={false} className="overflow-hidden">
      <div className="bg-zinc-50 dark:bg-zinc-800/20 border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs text-zinc-600 dark:text-zinc-400">
            <Icons.ScaleBalance size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
                Processo
              </span>
              <Badge status={process.origem} />
            </div>
            <h2 className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {process.numero}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Icons.Calendar size={16} />
          Publicado em <span className="font-semibold">{publishedAt}</span>
        </div>
      </div>

      <CardContent className="space-y-6 p-6">
        <section>
          <h3 className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase mb-4">
            Resumo do processo
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
              <p className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Origem
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {process.origem}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
              <p className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Participantes
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {process.polosProcessos.length} vinculados
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
              <p className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Tipo de polo
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {activeParties.length} ativo, {passiveParties.length} passivo
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
            Polo ativo
          </h3>
          {renderParticipants(activeParties)}
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
            Polo passivo
          </h3>
          {renderParticipants(passiveParties)}
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
            Outros participantes
          </h3>
          {renderParticipants(otherParties)}
        </section>
      </CardContent>
    </Card>
  );
}
