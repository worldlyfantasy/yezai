import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 animate-in fade-in-0 duration-200">
      <div className="mb-6">
        <Skeleton className="mb-2 h-4 w-24" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="mt-2 h-4 max-w-2xl" />
        <Skeleton className="mt-1 h-4 max-w-xl" />
      </div>
      <div className="mb-6 flex gap-3">
        <Skeleton className="h-10 flex-1 rounded-card" />
        <Skeleton className="h-10 w-24 rounded-btn" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="overflow-hidden rounded-card border border-border bg-card shadow-card">
            <Skeleton className="h-48 w-full" />
            <div className="flex items-center justify-between gap-2 p-4">
              <Skeleton className="h-7 w-36" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="space-y-2 px-4 pb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
