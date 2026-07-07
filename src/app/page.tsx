import Link from "next/link";
import {
  getApiErrorMessage,
  getTceProcesses,
  getTjpbProcesses,
} from "@/feature/processes/api/server";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/shared/components/card";
import { Icons } from "@/shared/components/icons";
import { ErrorState } from "@/shared/components/states";

export default async function DashboardPage() {
  const [tceResult, tjpbResult] = await Promise.allSettled([
    getTceProcesses(1, 10),
    getTjpbProcesses(1, 10),
  ]);
  const hasDashboardError =
    tceResult.status === "rejected" && tjpbResult.status === "rejected";
  const errorMessages = hasDashboardError
    ? Array.from(
        new Set([
          getApiErrorMessage(tceResult.reason),
          getApiErrorMessage(tjpbResult.reason),
        ])
      )
    : [];

  const tceTotal = tceResult.status === "fulfilled" ? tceResult.value.total : 0;
  const tjpbTotal =
    tjpbResult.status === "fulfilled" ? tjpbResult.value.total : 0;
  const grandTotal = tceTotal + tjpbTotal;
  const latestTceDate =
    tceResult.status === "fulfilled" && tceResult.value.data[0]
      ? new Date(tceResult.value.data[0].dataPublicacao).toLocaleDateString(
          "pt-BR"
        )
      : "Indisponível";
  const latestTjpbDate =
    tjpbResult.status === "fulfilled" && tjpbResult.value.data[0]
      ? new Date(tjpbResult.value.data[0].dataPublicacao).toLocaleDateString(
          "pt-BR"
        )
      : "Indisponível";

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
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
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

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 flex-1">
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

        <main className="flex-1 min-w-0 space-y-8">
          {hasDashboardError ? (
            <ErrorState
              title="Erro ao carregar o painel"
              message={errorMessages.join(" ")}
            />
          ) : (
            <>
          <div className="bg-indigo-600 text-white rounded-2xl p-6 md:p-8 shadow-xs relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/10">
              <Icons.ScaleBalance size={300} />
            </div>
            <div className="relative z-10 max-w-xl space-y-2">
              <span className="text-xs font-bold bg-indigo-500 text-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Painel Administrativo
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Consulta integrada de processos
              </h1>
              <p className="text-sm md:text-base text-indigo-100 font-medium">
                O dashboard agora consome os dados reais da API para TCE-PB e
                TJPB usando Server Components no App Router.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hoverEffect>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Total monitorado
                </CardTitle>
                <div className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-950/20">
                  <Icons.Folder size={20} />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {grandTotal}
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
                  Soma total dos processos retornados pela API
                </p>
              </CardContent>
            </Card>

            <Card hoverEffect>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Última publicação TCE
                </CardTitle>
                <div className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-950/20">
                  <Icons.Calendar size={20} />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {tceTotal}
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
                  Último registro publicado em {latestTceDate}
                </p>
              </CardContent>
            </Card>

            <Card hoverEffect>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Última publicação TJPB
                </CardTitle>
                <div className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-100 dark:border-amber-950/20">
                  <Icons.Clock size={20} />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {tjpbTotal}
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
                  Último registro publicado em {latestTjpbDate}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hoverEffect className="flex flex-col h-full">
              <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Icons.Building size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">Processos do TCE-PB</CardTitle>
                    <CardDescription className="text-xs">
                      Listagem paginada da API externa
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                  Consulte a base do Tribunal de Contas com paginação e detalhe
                  individual conectado ao backend.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    {tceTotal} processos encontrados
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

            <Card hoverEffect className="flex flex-col h-full">
              <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Icons.ScaleBalance size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">Processos do TJPB</CardTitle>
                    <CardDescription className="text-xs">
                      Listagem paginada da API externa
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                  Navegue pela base do Tribunal de Justiça com o mesmo fluxo de
                  listagem, detalhe e movimentações.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    {tjpbTotal} processos encontrados
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
            </>
          )}
        </main>
      </div>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 bg-white dark:bg-zinc-900/40 text-center text-xs text-zinc-400 dark:text-zinc-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} JurídicoPortal - Consulta de Processos.</p>
          <p className="mt-1">Frontend conectado à API de processos via App Router.</p>
        </div>
      </footer>
    </div>
  );
}
