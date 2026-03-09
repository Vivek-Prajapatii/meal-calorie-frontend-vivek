"use client";
import { useCalorieStore } from "@/stores/userCalorieStore";
import { Minus, Plus } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function ServingsControl({
  initialServings,
}: {
  initialServings: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const caloriesData = useCalorieStore((state) => state.caloriesData);

  const updateServings = (newCount: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("servings", newCount.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-end items-center">
      <div>
        <div className="flex items-center gap-3 border rounded-full px-4 py-1">
          <Minus
            className="cursor-pointer"
            onClick={() => updateServings(Math.max(1, initialServings - 1))}
          />
          <span className="font-medium">{initialServings} Serving</span>
          <Plus
            className="cursor-pointer"
            onClick={() => updateServings(initialServings + 1)}
          />
        </div>
      </div>
    </div>
  );
}
