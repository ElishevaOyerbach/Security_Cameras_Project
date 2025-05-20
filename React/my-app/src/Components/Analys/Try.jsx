import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip, 
  Area,
} from "recharts";

export default function PeopleChart() {
  const [Data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => { 
    console.log("מתחיל למשוך נתונים מהשרת...");

    fetch("http://localhost:5000/people-per-minute")
      .then(res => {
        if (!res.ok) {
          throw new Error(`שגיאה מהשרת: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("✅ נתונים שהתקבלו מהשרת:", data);
        setData(data);
      })
      .catch(err => {
        console.error("❌ שגיאה בעת בקשת הנתונים:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: 400, padding: "1rem", direction: "rtl" }}>
      <h2 style={{ textAlign: "right", marginBottom: "1rem" }}>מבקרים לאורך היום</h2>

      {error && (
        <p style={{ color: "red" }}>שגיאה: לא ניתן לטעון את הנתונים ({error})</p>
      )}

      {Data.length === 0 ? (
        <p>⏳ טוען נתונים...</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={Data}>
            <defs>
              <linearGradient id="colorPeople" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3f80ff" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3f80ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="people"
              stroke="#3f80ff"
              fillOpacity={1}
              fill="url(#colorPeople)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      <p style={{ textAlign: "center", marginTop: "1rem", color: "#555" }}>
        שעות שיא: 12:00–14:00 | ממוצע יומי: 38 מבקרים בשעה
      </p>
    </div>
  );
}

