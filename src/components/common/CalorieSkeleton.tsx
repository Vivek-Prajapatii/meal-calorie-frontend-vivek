import { Skeleton } from "@/components/ui/skeleton";

export function CaloriesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-start">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <Skeleton className="h-14 w-full rounded-xl" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
