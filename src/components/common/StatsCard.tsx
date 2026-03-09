import { StatsCardType } from "@/types/calories";
import { Card, CardContent } from "../ui/card";

export default function StatsCard({
  value,
  label,
  unit = "g",
  color,
  bg,
}: StatsCardType) {
  return (
    <Card className={`rounded-xl border-border ${bg}`}>
      <CardContent className="p-4 text-center">
        <p className="text-2xl font-bold">
          {value}
          <span className="text-sm ml-0.5">{unit}</span>
        </p>

        <p className={`${color} text-sm font-medium tracking-wider`}>
          {label}
        </p>
      </CardContent>
    </Card>
  );
}
