import { Skeleton } from "@/components/ui/skeleton";

export default function CreatorsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 animate-in fade-in-0 duration-200">
      <div className="mb-6">
        <Skeleton className="mb-2 h-4 w-32" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-2 h-4 max-w-2xl" />
        <Skeleton className="mt-1 h-4 max-w-xl" />
      </div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-[180px] rounded-card" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-[180px] rounded-card" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-card border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-chip" />
              <Skeleton className="h-6 w-20 rounded-chip" />
              <Skeleton className="h-6 w-14 rounded-chip" />
            </div>
            <Skeleton className="mt-4 h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
