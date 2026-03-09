import { create } from "zustand";
import { CaloriesData } from "@/types/calories";

interface CalorieState {
  caloriesData: CaloriesData | null;
  setCaloriesData: (data: CaloriesData | null) => void;
  reset: () => void;
}

export const useCalorieStore = create<CalorieState>((set) => ({
  caloriesData: null,
  setCaloriesData: (data) => set({ caloriesData: data }),
  reset: () => set({ caloriesData: null }),
}));
