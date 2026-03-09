import { ServingsControl } from "@/components/common/ServingsControl";
import {
  caloriePostBody,
  defaultStyle,
  nutrientColors,
} from "@/types/calories";
import { Utensils } from "lucide-react";
import { cookies } from "next/headers";
import { getCaloriesApiUrl } from "../../../api-endpoints";
import StatsCard from "./StatsCard";
import { StoreInitializer } from "./storeInit";

const getCalories = async (values: caloriePostBody) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch(`${getCaloriesApiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function CaloriesContent({
  dish_name,
  servings,
}: caloriePostBody) {
  const caloriesData = await getCalories({ dish_name, servings });

  if (!caloriesData)
    return <div className="text-center p-10">Failed to fetch data.</div>;

  return (
    <>
      <StoreInitializer data={caloriesData} />
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold tracking-tight capitalize">
          {caloriesData.dish_name}
        </h2>
        <ServingsControl initialServings={servings} />
      </div>

      <div className="bg-yellow-400 dark:bg-yellow-500 text-yellow-950 rounded-xl px-4 py-3 flex items-center gap-3">
        <div className="bg-white/90 rounded-full p-2">
          <Utensils size={16} className="text-yellow-600" />
        </div>
        <p className="text-sm font-semibold">
          Amount of calories per serving: {caloriesData?.calories_per_serving}{" "}
          Cal
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
    </>
  );
}
