export type CaloriesPageProps = {
  searchParams: {
    dishName: string;
    servings: number;
  };
};

export type caloriePostBody = {
  dish_name: string;
  servings: number;
};

export type StatsCardType = {
  value: number;
  label: string;
  unit: string;
  color?: string;
  bg?: string;
};

export interface Macronutrients {
  protein: number;
  total_fat: number;
  carbohydrates?: number;
  fiber?: number;
  sugars?: number;
  saturated_fat?: number;
}

export interface IngredientBreakdown {
  name: string;
  calories_per_100g: number;
  macronutrients_per_100g: Macronutrients;
  serving_size?: string;
  data_type: string;
  fdc_id: number;
  brand: string;
}

export interface MatchedFood {
  name: string;
  fdc_id: number;
  data_type: string;
  published_date: string;
}

export interface CaloriesData {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  macronutrients_per_serving: Macronutrients;
  total_macronutrients: Macronutrients;
  source?: string;
  ingredient_breakdown: IngredientBreakdown[];
  matched_food: MatchedFood;
}

export const nutrientColors: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  protein: {
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/40",
    label: "Protein",
  },
  carbohydrates: {
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    label: "Carbohydrates",
  },
  total_fat: {
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    label: "Total Fat",
  },
  saturated_fat: {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    label: "Saturated Fat",
  },
  fiber: {
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    label: "Fiber",
  },
  sugars: {
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/40",
    label: "Sugars",
  },
};
  
export const defaultStyle = {
  color: "text-gray-500",
  bg: "bg-gray-50",
  label: "Other",
};