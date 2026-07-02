import React from "react";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const TableContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 ${className}`}
    >
      {children}
    </div>
  );
};

export const Table = ({ children, className = "", ...props }: TableProps) => {
  return (
    <table
      className={`w-full text-left border-collapse text-sm text-zinc-600 dark:text-zinc-400 ${className}`}
      {...props}
    >
      {children}
    </table>
  );
};

export const TableHeader = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <thead
      className={`bg-zinc-50 dark:bg-zinc-800/40 text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
};

export const TableBody = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <tbody
      className={`divide-y divide-zinc-200 dark:divide-zinc-800/80 ${className}`}
      {...props}
    >
      {children}
    </tbody>
  );
};

export const TableRow = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr
      className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableHead = ({
  children,
  className = "",
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th className={`px-6 py-4 font-semibold ${className}`} {...props}>
      {children}
    </th>
  );
};

export const TableCell = ({
  children,
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      className={`px-6 py-4 align-middle whitespace-nowrap text-zinc-900 dark:text-zinc-100 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};
