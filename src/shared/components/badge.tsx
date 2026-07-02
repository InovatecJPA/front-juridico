import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: string;
}

export const Badge = ({ status, className = "", ...props }: BadgeProps) => {
  const getStatusStyles = (val: string) => {
    const formattedVal = val.toLowerCase().trim();

    // Success states
    if (["aprovado", "regular", "deferido", "concluído"].includes(formattedVal)) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
    }

    // Ongoing/Active states
    if (["ativo", "em instrução", "tramitando", "em andamento"].includes(formattedVal)) {
      return "bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20";
    }

    // Warnings/Pending states
    if (["pendente", "suspenso", "recurso", "análise"].includes(formattedVal)) {
      return "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
    }

    // Danger/Alert states
    if (["irregular", "cancelado", "indeferido", "rejeitado", "urgente"].includes(formattedVal)) {
      return "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20";
    }

    // Gray/Neutral states (default)
    return "bg-zinc-50 text-zinc-600 border-zinc-200/60 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
  };

  const style = getStatusStyles(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${style} ${className}`}
      {...props}
    >
      {status}
    </span>
  );
};
