import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from "recharts";

interface MiniChartProps {
  data: { date: string; price: number }[];
}

export default function MiniChart({ data }: MiniChartProps) {
  const minPrice = Math.min(...data.map((d) => d.price));
  const maxPrice = Math.max(...data.map((d) => d.price));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <YAxis domain={[minPrice, maxPrice]} hide={true} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
