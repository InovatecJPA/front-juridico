import { Card } from "@/shared/components/card";
import { TableSkeleton } from "@/shared/components/states";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-72 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full max-w-2xl rounded-md bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <Card hoverEffect={false} className="p-6">
        <TableSkeleton rows={6} />
      </Card>
    </div>
  );
}
