"use client";

import React from "react";
import Link from "next/link";
import { useTceProcesses, useTjpbProcesses } from "@/feature/processes/hooks";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/shared/components/card";
import { Icons } from "@/shared/components/icons";
import { SkeletonLine } from "@/shared/components/states";

export default function DashboardPage() {
  const { data: tceData, loading: tceLoading } = useTceProcesses();
  const { data: tjpbData, loading: tjpbLoading } = useTjpbProcesses();

  const loading = tceLoading || tjpbLoading;

  // Estatísticas
  const tceTotal = tceData.length;
  const tjpbTotal = tjpbData.length;
  const grandTotal = tceTotal + tjpbTotal;

  const activeTjpb = tjpbData.filter((p) => p.status.toLowerCase() === "ativo").length;
  const pendingTotal =
    tceData.filter((p) => p.status.toLowerCase() === "pendente").length +
    tjpbData.filter((p) => p.status.toLowerCase() === "suspenso").length;

  const navigation = [
    { name: "Painel Geral", href: "/", icon: <Icons.Home size={18} />, active: true },
    {
      name: "Processos TCE",
      href: "/processes/tce",
      icon: <Icons.Building size={18} />,
      active: false,
    },
    {
      name: "Processos TJPB",
      href: "/processes/tjpb",
      icon: <Icons.ScaleBalance size={18} />,
      active: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      {/* Header Institucional */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              <div className="p-2 bg-indigo-600 dark:bg-indigo-500 rounded-lg text-white shadow-sm flex items-center justify-center">
                <Icons.ScaleBalance size={20} />
              </div>
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50">
                Jurídico<span className="text-indigo-600 dark:text-indigo-400">Portal</span>
              </span>
            </Link>
          </div>
          <div className="text-xs text-zinc-400 dark:text-zinc-500 font-medium hidden sm:block">
            Tribunais de Contas e Justiça da Paraíba
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 flex-1">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none border-b border-zinc-200 dark:border-zinc-800 md:border-b-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                  item.active
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Dashboard Main Panel */}
        <main className="flex-1 min-w-0 space-y-8">
          {/* Welcome Banner */}
          <div className="bg-indigo-600 text-white rounded-2xl p-6 md:p-8 shadow-xs relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/10">
              <Icons.ScaleBalance size={300} />
            </div>
            <div className="relative z-10 max-w-xl space-y-2">
              <span className="text-xs font-bold bg-indigo-500 text-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Painel Administrativo
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Consulta Integrada de Processos
              </h1>
              <p className="text-sm md:text-base text-indigo-100 font-medium">
                Centralize o acompanhamento das bases de dados do Tribunal de Contas (TCE) e do Tribunal de Justiça (TJPB) do estado da Paraíba.
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Total Geral */}
            <Card hoverEffect={true}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Total Monitorado
                  </CardTitle>
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-950/20">
                  <Icons.Folder size={20} />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                {loading ? (
                  <SkeletonLine className="w-16 h-8 mt-1" />
                ) : (
                  <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {grandTotal}
                  </div>
                )}
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
                  Processos nas bases TCE e TJPB
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Ativos/Aprovados */}
            <Card hoverEffect={true}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Processos Ativos (TJ)
                  </CardTitle>
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-950/20">
                  <Icons.Gavel size={20} />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                {loading ? (
                  <SkeletonLine className="w-16 h-8 mt-1" />
                ) : (
                  <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {activeTjpb}
                  </div>
                )}
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
                  Tramitando na Justiça Estadual
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Pendentes/Suspensos */}
            <Card hoverEffect={true}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Pendências / Suspensões
                  </CardTitle>
                </div>
                <div className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-100 dark:border-amber-950/20">
                  <Icons.Clock size={20} />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                {loading ? (
                  <SkeletonLine className="w-16 h-8 mt-1" />
                ) : (
                  <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {pendingTotal}
                  </div>
                )}
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
                  Aguardando instrução ou julgamento
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tribunal Switch Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card TCE */}
            <Card hoverEffect={true} className="flex flex-col h-full">
              <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Icons.Building size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">Processos do TCE-PB</CardTitle>
                    <CardDescription className="text-xs">Tribunal de Contas da Paraíba</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                  Monitore contas municipais e estaduais, licitações, convênios de prefeituras e secretarias e acompanhamentos técnicos em tempo real.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    {loading ? "Carregando..." : `${tceTotal} Processos cadastrados`}
                  </span>
                  <Link
                    href="/processes/tce"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all shadow-xs"
                  >
                    Acessar TCE
                    <Icons.ChevronRight size={14} />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Card TJPB */}
            <Card hoverEffect={true} className="flex flex-col h-full">
              <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Icons.ScaleBalance size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">Processos do TJPB</CardTitle>
                    <CardDescription className="text-xs">Tribunal de Justiça da Paraíba</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                  Consulte ações cíveis, processos de improbidade administrativa, cobranças de títulos, varas de família e a distribuição processual judicial da Paraíba.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    {loading ? "Carregando..." : `${tjpbTotal} Processos cadastrados`}
                  </span>
                  <Link
                    href="/processes/tjpb"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all shadow-xs"
                  >
                    Acessar TJPB
                    <Icons.ChevronRight size={14} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 bg-white dark:bg-zinc-900/40 text-center text-xs text-zinc-400 dark:text-zinc-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} JurídicoPortal - Consulta de Processos Jurídicos e Administrativos.</p>
          <p className="mt-1">Desenvolvido em conformidade com as diretrizes do TCE-PB e TJPB.</p>
        </div>
      </footer>
    </div>
  );
}
