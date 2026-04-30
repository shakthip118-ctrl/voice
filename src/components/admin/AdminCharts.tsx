"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetAppointments } from "@/hooks/use-appointments";

const trendConfig = {
  appointments: {
    label: "Appointments",
    theme: {
      light: "hsl(22 65% 55%)",
      dark: "hsl(22 65% 55%)",
    },
  },
} as const;

function AdminCharts() {
  const { data: appointments = [] } = useGetAppointments();

  // Weekly trend (last 8 weeks)
  const today = new Date();
  const weeklyData: { week: string; appointments: number }[] = [];
  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - i * 7);
    const weekLabel = weekStart.toLocaleString("default", {
      month: "short",
      day: "numeric",
    });

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const count = appointments.filter((apt) => {
      const d = new Date(apt.date);
      return d >= weekStart && d < weekEnd;
    }).length;

    weeklyData.push({ week: weekLabel, appointments: count });
  }

  return (
    <div className="grid md:grid-cols-1 gap-6 mb-12">
      {/* Weekly Trend Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-5 w-5 text-primary" />
            Weekly Trend
          </CardTitle>
          <CardDescription>
            Appointment volume over the last 8 weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {weeklyData.some((d) => d.appointments > 0) ? (
            <ChartContainer config={trendConfig} className="h-[220px] w-full">
              <AreaChart
                data={weeklyData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dashed" />}
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                />
                <Area
                  dataKey="appointments"
                  type="monotone"
                  fill="var(--color-appointments)"
                  fillOpacity={0.2}
                  stroke="var(--color-appointments)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">
              No weekly data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminCharts;
