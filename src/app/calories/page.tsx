import { BackButton } from "@/components/common/BackButton";
import { CaloriesSkeleton } from "@/components/common/CalorieSkeleton";
import { CaloriesContent } from "@/components/common/CaloriesContent";
import { CaloriesPageProps } from "@/types/calories";
import { Suspense } from "react";

export default async function CaloriesPage({
  searchParams,
}: CaloriesPageProps) {
  const resolvedParams = await searchParams;
  const dishName = (resolvedParams.dishName as string) || "vada pav";
  const servings = Number(resolvedParams.servings) || 1;

  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-br from-slate-300 via-stone-200 to-slate-400 dark:from-gray-900 dark:via-stone-800 dark:to-gray-950 min-h-screen p-6 transition-colors">
        <div className="bg-card text-card-foreground border rounded-2xl shadow-xl w-full max-w-5xl p-8 space-y-6">
          <div className="flex items-center">
            <BackButton />
          </div>

          <Suspense
            key={`${dishName}-${servings}`}
            fallback={<CaloriesSkeleton />}
          >
            <CaloriesContent dish_name={dishName} servings={servings} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
