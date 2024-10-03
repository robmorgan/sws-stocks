import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MiniChartProps {
  data: { date: string; price: number }[];
}

export default function MiniChart({ data }: MiniChartProps) {
  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
