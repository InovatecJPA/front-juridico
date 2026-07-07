"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/shared/components/icons";

export default function ProcessesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: "Painel Geral", href: "/", icon: <Icons.Home size={18} /> },
    {
      name: "Processos TCE",
      href: "/processes/tce",
      icon: <Icons.Building size={18} />,
    },
    {
      name: "Processos TJPB",
      href: "/processes/tjpb",
      icon: <Icons.ScaleBalance size={18} />,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

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
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                    active
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 bg-white dark:bg-zinc-900/40 text-center text-xs text-zinc-400 dark:text-zinc-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} JurídicoPortal - Consulta de Processos Jurídicos e Administrativos.</p>
          <p className="mt-1">Desenvolvido em conformidade com as diretrizes do TCE-PB e TJPB.</p>
        </div>
      </footer>
    </div>
  );
}
