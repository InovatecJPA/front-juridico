import { Card } from "@/shared/components/card";
import { DetailSkeleton } from "@/shared/components/states";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Card hoverEffect={false} className="p-6">
        <DetailSkeleton />
      </Card>

      <Card hoverEffect={false} className="p-6">
        <div className="space-y-4">
          <div className="h-5 w-48 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-4/5 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-3/5 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </Card>
    </div>
  );
}
