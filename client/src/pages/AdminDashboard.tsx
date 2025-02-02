import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CartesianGrid, XAxis, Bar, BarChart, Pie, PieChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import api from "@/api/api";

type StatusCounts = {
  active: number;
  failed: number;
  completed: number;
};

type TotalInvestedAndGoal = {
  totalInvestedAmount: number;
  totalProjectGoal: number;
};

type ChartProps = {
  className: string;
  data: any[];
};

export default function AdminDashboard() {
  const pieChartConfig = {
    visitors: {
      label: "Visitors",
    },
    active: {
      label: "Active",
      color: "hsl(var(--chart-1))",
    },
    failed: {
      label: "Completed",
      color: "hsl(var(--chart-2))",
    },
    completed: {
      label: "Failed",
      color: "hsl(var(--chart-3))",
    },
  };

  const [statusData, setStatusData] = useState<StatusCounts[]>([
    {
      active: 0,
      failed: 0,
      completed: 0,
    },
  ]);

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  };
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];

  const [totalInvestedAndGoal, setTotalInvestedAndGoal] =
    useState<TotalInvestedAndGoal>({
      totalInvestedAmount: 0,
      totalProjectGoal: 0,
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/admin/project-metrics");
        const data = response.data;

        if (data && data.data) {
          setStatusData([data.data.statusCounts]);
          setTotalInvestedAndGoal(
            data.data.totals || { totalInvestedAmount: 0, totalProjectGoal: 0 },
          );
        }
      } catch (error) {
        console.error("Error fetching project metrics:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Status data", chartData);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8'>
      <Card className='flex flex-col'>
        <CardHeader className='items-center pb-0'>
          <CardTitle>Pie Chart - Donut</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className='flex-1 pb-0'>
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square max-h-[250px]'
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey='visitors'
                nameKey='browser'
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className='flex-col gap-2 text-sm'>
          <div className='flex items-center gap-2 font-medium leading-none'>
            Trending up by 5.2% this month{" "}
            <TrendingUpIcon className='h-4 w-4' />
          </div>
          <div className='leading-none text-muted-foreground'>
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
