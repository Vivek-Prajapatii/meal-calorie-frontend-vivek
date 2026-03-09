"use client";

import {  useRef } from "react";
import { CaloriesData } from "@/types/calories";
import { useCalorieStore } from "@/stores/userCalorieStore";

export function StoreInitializer({ data }: { data: CaloriesData | null }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useCalorieStore.setState({ caloriesData: data });
    initialized.current = true;
  }

  return null;
}
