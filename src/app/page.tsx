"use client";

import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/common/PageLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { AuthButtons } from "@/components/common/AuthButtons";
import { PopularDishes } from "@/components/common/PopularDishes";

export default function Home() {
  const router = useRouter();

  return (
    <PageLayout>
      <PageHeader />
      <AuthButtons />
      <PopularDishes handleSearch={() => router.push("/login")} />
    </PageLayout>
  );
}
