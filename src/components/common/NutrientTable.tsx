import React from "react";
import { Macronutrients } from "@/types/calories";

interface NutrientTableProps {
  macronutrients: Macronutrients;
  title?: string;
}

export const NutrientTable: React.FC<NutrientTableProps> = ({ 
  macronutrients, 
  title 
}) => {
  const formatNutrientName = (key: string): string => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const entries = Object.entries(macronutrients);

  return (
    <div>
      {title && <h4 className="font-medium mb-2">{title}</h4>}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {entries?.map(([key, value]) => (
          <React.Fragment key={key}>
            <div className="text-muted-foreground">
              {formatNutrientName(key)}:
            </div>
            <div className="font-medium text-right">
              {value}g
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
