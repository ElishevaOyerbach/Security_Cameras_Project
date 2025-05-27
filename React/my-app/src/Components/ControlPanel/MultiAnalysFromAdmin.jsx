import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { hour: "0:00", A: 1, B: 2, C: 3 },
  { hour: "0:01", A: 2, B: 1, C: 4 },
  { hour: "0:02", A: 3, B: 0, C: 2 },
  { hour: "0:03", A: 4, B: 3, C: 1 },
];

export default function MultiRecordingChart() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="hour" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line dataKey="A" stroke="#FFD700" />
          <Line dataKey="B" stroke="#00CED1" />
          <Line dataKey="C" stroke="#FF7F7F" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
