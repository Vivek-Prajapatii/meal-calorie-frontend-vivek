"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [serving, setServing] = useState<number>(1);

  const foods = [
    "Vada pav",
    "Paneer tikka",
    "Idli",
    "Plain dosa",
    "Gulab jamun",
    "Dall tadka",
    "Samossa",
  ];

  const handleSearch = () => {
    router.push(`/calories?dishName=${searchQuery}&servings=${serving}`);
  };

  return (
    <div className="flex flex-col m-10 items-center justify-center bg-background px-4">
      <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance">
        Check calories of what you eat. Instantly.
      </h1>
      <h2 className="leading-3 [&:not(:first-child)]:mt-7 m-15">
        10,000+ Indian foods with full nutrition info. Just search.
      </h2>

      <div className="flex items-center w-full max-w-2xl relative">
        <Search className="absolute left-4 w-5 text-muted-foreground" />
        
        {/* dish name input */}
        <Input
          placeholder="Search food items"
          className="pl-13 pr-35 h-16 rounded-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Servings input */}
        <div className="absolute right-30 flex items-center bg-muted rounded-lg px-2 py-1">
          <input
            type="number"
            className="w-8 h-8 text-center border-none outline-none"
            min="1"
            max="10"
            value={serving}
            onChange={(e) => setServing(Number(e.target.value))}
          />
          <label className="text-sm text-muted-foreground mr-2 ml-2 mt-1">Serving</label>
        </div>

        {/* search button */}
        <Button className="absolute right-1 h-15 px-6 rounded-full text-lg hover:bg-primary/80"
          disabled={!searchQuery.trim()}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {/* Popular dishes */}
      <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-3xl">
        {foods?.map((food) => (
          <button
            key={food}
            className="px-4 py-2 text-sm border rounded-full bg-background 
                 shadow-sm hover:shadow-md transition-shadow 
                 hover:bg-accent"
          >
            {food}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
