import React from "react";

interface PopularDishesProps {
  handleSearch: (food: string) => void;
}

export const PopularDishes: React.FC<PopularDishesProps> = ({
  handleSearch,
}) => {
  const foods = [
    "Vada pav",
    "Paneer tikka",
    "Idli",
    "Plain dosa",
    "Gulab jamun",
    "Dal tadka",
    "Samosa",
    "Dal Makhni",
    "Chicken tikka",
    "Chicken Biryani",
    "Chicken curry",
    "Chicken korma",
  ];

  return (
    <div>
      <h3 className="flex ml-2 justify-start text-lg font-semibold mt-8">
        Popular Dishes
      </h3>
      <div className="flex flex-wrap justify-center gap-3 mt-2 max-w-3xl">
        {foods?.map((food) => (
          <button
            key={food}
            onClick={() => handleSearch(food)}
            className="px-4 py-2 text-sm border rounded-full bg-background 
                 shadow-sm hover:shadow-md transition-shadow 
                 hover:bg-accent border-slate-400 dark:border-stone-600"
          >
            {food}
          </button>
        ))}
      </div>
    </div>
  );
};
