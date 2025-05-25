import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#ffffff", "#29cc8b"]; // לבן = ריק, ירוק = פעיל

export default function PeoplePieChart({ data }) {
  if (!data || data.length === 0) return null;

  const emptyCount = data.filter(entry => entry.people === 0).length;
  const activeCount = data.length - emptyCount;

  const chartData = [
    { name: "שעות ריקות", value: emptyCount },
    { name: "שעות פעילות", value: activeCount }
  ];

  const totalPeople = data.reduce((sum, entry) => sum + entry.people, 0);
  const averagePeople = (totalPeople / data.length).toFixed(1);

  return (
    <div
      style={{
        backgroundColor: "#383c4d", // card-bg
        borderRadius: "5px",
        padding: "1rem",
        width: "100%",
        height: "460px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <h3 style={{ fontSize: "1.25rem", color: "#ffffff", marginBottom: "1rem" }}>
        שעות פעילות לעומת ריקות
      </h3>

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <PieChart>
            <defs>
              <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#29cc8b" />
              </filter>
            </defs>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              stroke="#2b2f3f"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  filter={index === 1 ? "url(#glow-green)" : undefined}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value} דקות`}
              contentStyle={{ backgroundColor: "#2b2f3f", color: "#ffffff", border: "none" }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ color: "#ffffff" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          marginTop: "1.25rem",
          fontSize: "1rem",
          color: "#ffffff",
          backgroundColor: "#2b2f3f",
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          width: "100%",
          textAlign: "center"
        }}
      >
        ממוצע מבקרים לדקה: <strong>{averagePeople}</strong>
      </div>
    </div>
  );
}
