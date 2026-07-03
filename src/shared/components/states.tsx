import React from "react";
import { Icons } from "./icons";

export const SkeletonLine = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`h-4 bg-zinc-200 dark:bg-zinc-800 rounded-sm animate-pulse ${className}`}
    />
  );
};

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex space-x-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <SkeletonLine className="w-1/4 h-5" />
        <SkeletonLine className="w-1/4 h-5" />
        <SkeletonLine className="w-1/4 h-5" />
        <SkeletonLine className="w-1/4 h-5" />
      </div>
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="flex space-x-4 py-2 border-b border-zinc-100 dark:border-zinc-800/40"
        >
          <SkeletonLine className="w-1/4" />
          <SkeletonLine className="w-1/3" />
          <SkeletonLine className="w-1/6" />
          <SkeletonLine className="w-1/5" />
        </div>
      ))}
    </div>
  );
};

export const DetailSkeleton = () => {
  return (
    <div className="space-y-6 w-full animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/3" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/4" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <div className="space-y-4">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/2" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-2/3" />
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-2/3" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/2" />
        </div>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({
  title = "Nenhum registro encontrado",
  description = "Não conseguimos localizar nenhuma informação correspondente ao seu critério de busca.",
  icon,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 py-16 bg-zinc-50/50 dark:bg-zinc-900/20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
      <div className="text-zinc-400 dark:text-zinc-600 mb-4 bg-white dark:bg-zinc-900 p-4 rounded-full shadow-xs border border-zinc-100 dark:border-zinc-800">
        {icon || <Icons.Folder size={32} />}
      </div>
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm">
        {description}
      </p>
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "Erro ao carregar dados",
  message = "Ocorreu uma falha na comunicação com o servidor. Por favor, verifique sua conexão e tente novamente.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-12 bg-rose-50/40 dark:bg-rose-950/5 border border-rose-200/50 dark:border-rose-950/20 rounded-2xl">
      <div className="text-rose-600 dark:text-rose-400 mb-4 bg-rose-50 dark:bg-rose-950/30 p-3 rounded-full border border-rose-100 dark:border-rose-900/30">
        <Icons.AlertTriangle size={28} />
      </div>
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 px-4 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all shadow-sm"
        >
          Tentar Novamente
        </button>
      )}
    </div>
  );
};
