"use client";

import { ServingsControl } from "@/components/common/ServingsControl";
import {
  caloriePostBody,
  CaloriesData,
  defaultStyle,
  nutrientColors,
} from "@/types/calories";
import { Utensils } from "lucide-react";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getCaloriesApiUrl } from "../../../api-endpoints";
import { CaloriesSkeleton } from "./CalorieSkeleton";
import StatsCard from "./StatsCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion } from "@/components/ui/accordion";
import { NutrientTable } from "@/components/common/NutrientTable";

import { StoreInitializer } from "./storeInit";
import { useRouter } from "next/navigation";

const getCalories = async (
  values: caloriePostBody,
  onError?: (message: string) => void,
) => {
  try {
    const session = await getSession();
    const response = await fetch(`${getCaloriesApiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const result = await response?.json();
      onError?.(result?.message);
      return null;
    }

    return await response?.json();
  } catch (error) {
    console.error("Error fetching calories:", error);
    onError?.("Error fetching calories:");
    return null;
  }
};

export const CaloriesContent = ({
  dish_name,
  servings,
}: {
  dish_name: string;
  servings: number;
}) => {
  const router = useRouter();
  const [caloriesData, setCaloriesData] = useState<CaloriesData | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCalories(
          { dish_name, servings },
          setAlertMessage,
        );
        if (data) {
          setCaloriesData(data);
        }
      } catch (error) {
        setAlertMessage("Failed to fetch calorie data");
        console.error("Fetch error:", error);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      if (alertMessage) {
        setAlertMessage(null);
        router.push("/dashboard");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!caloriesData) {
    return (
      <>
        {alertMessage && (
          <Alert
            variant="destructive"
            className="w-lg mb-4 flex justify-center justify-self-center border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50"
          >
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}
        <CaloriesSkeleton />
      </>
    );
  }

  return (
    <>
      <StoreInitializer data={caloriesData} />
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold tracking-tight capitalize">
          {caloriesData?.dish_name || dish_name}
        </h2>
        <ServingsControl initialServings={servings} />
      </div>

      <div className="bg-yellow-200 dark:bg-yellow-300 text-yellow-900 rounded-xl px-4 py-3 flex items-center gap-3">
        <div className="bg-white/90 rounded-full p-2">
          <Utensils size={16} className="text-yellow-600" />
        </div>
        <p className="text-sm font-semibold">
          Total calories in {servings} serving:{" "}
          {caloriesData?.total_calories} Cal
        </p>
      </div>

      {caloriesData?.total_macronutrients && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(caloriesData?.total_macronutrients ?? {})?.map(
            ([key, value]) => {
              const nutrient = nutrientColors[key] ?? defaultStyle;

              return (
                <StatsCard
                  key={key}
                  value={value as number}
                  label={nutrient?.label}
                  unit="g"
                  color={nutrient?.color}
                  bg={nutrient?.bg}
                />
              );
            },
          )}
        </div>
      )}

      {/* Ingredient Breakdown Accordion */}
      {caloriesData?.ingredient_breakdown &&
        caloriesData.ingredient_breakdown.length > 0 && (
          <Accordion
            title={`Ingredient Breakdown per 100 Grams`}
            className="mt-4"
          >
            <div className="space-y-4">
              {caloriesData.ingredient_breakdown.map((ingredient, index) => (
                <div key={index} className="rounded-lg p-3">
                  <div className="mb-2 flex justify-between items-center">
                    <h4 className="font-medium text-sm">{ingredient.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {ingredient.calories_per_100g} calories per 100g
                    </p>
                  </div>
                  <NutrientTable
                    macronutrients={ingredient.macronutrients_per_100g}
                    title="Macronutrients per 100g"
                  />
                </div>
              ))}
            </div>
          </Accordion>
        )}
    </>
  );
};

export default CaloriesContent;
