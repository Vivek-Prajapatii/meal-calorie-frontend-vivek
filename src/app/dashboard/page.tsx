"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/common/PageLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { PopularDishes } from "@/components/common/PopularDishes";

const Dashboard = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [serving, setServing] = useState<number>(1);

  const handleSearch = (food: string = "") => {
    router.push(
      `/calories?dishName=${food?.trim() || searchQuery}&servings=${serving}`,
    );
  };

  return (
    <PageLayout>
      <PageHeader />

      <div className="flex items-center w-full max-w-2xl relative">
        <Search className="absolute left-4 w-5 text-muted-foreground" />

        {/* dish name input */}
        <Input
          placeholder="Search food items"
          className="pl-13 pr-35 h-16 rounded-full border-slate-400 dark:border-stone-600 focus:border-slate-500 dark:focus:border-stone-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Servings input */}
        <div className="absolute right-30 flex items-center bg-muted rounded-lg px-2 py-1 border border-slate-400 dark:border-stone-600">
          <input
            type="number"
            className="w-8 h-8 text-center border-none outline-none"
            min="1"
            max="10"
            value={serving}
            onChange={(e) => setServing(Number(e.target.value))}
          />
          <label className="text-sm text-muted-foreground mr-2 ml-2 mt-1">
            Serving
          </label>
        </div>

        {/* search button */}
        <Button
          className="absolute right-1 h-15 px-6 rounded-full text-lg hover:bg-primary/80"
          disabled={!searchQuery.trim()}
          onClick={() => handleSearch()}
        >
          Search
        </Button>
      </div>

      {/* Popular dishes */}
      <PopularDishes handleSearch={handleSearch} />
    </PageLayout>
  );
};

export default Dashboard;
