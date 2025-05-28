import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import AxiosMultiAnalyseFromAdmin from "./AxiosMultiAnalyseFromAdmin";

const MultiLineChart = ({ adminID }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      const cameras = await AxiosMultiAnalyseFromAdmin(adminID);

      const validCameras = cameras
        .filter(cam => Array.isArray(cam.peoplePerMinute) && cam.peoplePerMinute.length > 0)
        .slice(0, 4);

      const allHoursSet = new Set();
      validCameras.forEach(camera => {
        camera.peoplePerMinute.forEach(item => {
          const hour = item.hour.trim().replace(/:$/, "");
          allHoursSet.add(hour);
        });
      });
      const allHours = Array.from(allHoursSet).sort();

      const hoursMap = {};
      allHours.forEach(hour => {
        hoursMap[hour] = { hour };
      });

      validCameras.forEach((camera, camIndex) => {
        const camKey = `cam${camIndex + 1}`;
        const hourData = {};

        camera.peoplePerMinute.forEach(item => {
          const hour = item.hour.trim().replace(/:$/, "");
          hourData[hour] = item.people;
        });

        allHours.forEach(hour => {
          hoursMap[hour][camKey] = hourData[hour] ?? 0;
        });
      });

      const merged = Object.values(hoursMap);
      setChartData(merged);
    };

    fetchAndProcessData();
  }, [adminID]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        {/* קווי רשת בהירים יותר */}
        <CartesianGrid strokeDasharray="3 3" stroke="#4f5b6b" />

        {/* ציר X ו-Y */}
        <XAxis dataKey="hour" stroke="#b0bec5" />
        <YAxis stroke="#b0bec5" tick={false} axisLine={false} />

        {/* טול-טיפ כהה עם טקסט בהיר */}
        <Tooltip
          contentStyle={{ backgroundColor: "#1e272e", border: "none", color: "#ffffff" }}
          labelStyle={{ color: "#ffffff" }}
        />

        {/* כותרת צבעונית ועדינה */}
        <Legend
          wrapperStyle={{ color: "#cfd8dc" }}
          formatter={(value) => value.replace()}
        />

        {/* גרפים בצבעים שונים */}
        <Line
          type="monotone"
          dataKey="cam1"
          stroke="#00e676" // ירוק זוהר
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: '#ffffff' }}
          name="Security Camera 1"
        />
        <Line
          type="monotone"
          dataKey="cam2"
          stroke="#29b6f6" // תכלת
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: '#ffffff' }}
          name="Security Camera 2"
        />
        <Line
          type="monotone"
          dataKey="cam3"
          stroke="#ffca28" // צהוב
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: '#ffffff' }}
          name="Security Camera 3"
        />
        <Line
          type="monotone"
          dataKey="cam4"
          stroke="#ef5350" // אדום-ורוד
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: '#ffffff' }}
          name="Security Camera 4"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MultiLineChart;
