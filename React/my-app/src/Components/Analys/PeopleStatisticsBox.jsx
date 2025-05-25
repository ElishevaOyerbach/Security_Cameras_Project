import React from "react";

export default function PeopleStatisticsBox({ data }) {
  if (!data || data.length === 0) return null;

  const busiest = data.reduce((max, entry) => entry.people > max.people ? entry : max, data[0]);
  const avg = (data.reduce((sum, entry) => sum + entry.people, 0) / data.length).toFixed(1);
  const emptyMinutes = data.filter(entry => entry.people === 0).length;

  return (
    <div
      style={{
        width: "48%",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>נתונים מתוך הגרף</h3>
      <p><strong>השעה הכי עמוסה:</strong> {busiest.hour}</p>
      <p><strong>ממוצע מבקרים:</strong> {avg}</p>
      <p><strong>כמות דקות ריקות:</strong> {emptyMinutes}</p>
    </div>
  );
}
