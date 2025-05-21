
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Area,
// } from "recharts";
// import SaveAnalysis from "./SaveAnalysis";

// export default function PeopleChart() {
//   const [Data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const { showChart, recordingName, ID_video, peopleData } = location.state || {};

//   useEffect(() => {
//     if (!recordingName) return;

//     // אם יש נתונים מוכנים - נשתמש בהם
//     if (peopleData && peopleData.length > 0) {
//       console.log("📊 משתמשים ב-peopleData שהועבר מהניווט");
//       setData(peopleData);
//       return;
//     }

//     // אם אין נתונים - מבצעים fetch
//     console.log("📤 שולח את שם ההקלטה לשרת:", recordingName);

//     fetch("http://localhost:5000/people-per-minute", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ recordingName })
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`שגיאה מהשרת: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("✅ קיבלנו את הנתונים:", data);
//         setData(data);
//       })
//       .catch((err) => {
//         console.error("❌ שגיאה בעת שליחת הבקשה:", err);
//         setError(err.message);
//       });

//   }, [recordingName, peopleData]);

//   return (
//     <div style={{ width: "100%", height: 400, padding: "1rem", direction: "rtl" }}>
//       <h2 style={{ textAlign: "right", marginBottom: "1rem" }}>מבקרים לאורך היום</h2>

//       {error && (
//         <p style={{ color: "red" }}>שגיאה: לא ניתן לטעון את הנתונים ({error})</p>
//       )}

//       {Data.length === 0 ? (
//         <p>⏳ טוען נתונים...</p>
//       ) : (
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={Data}>
//             <defs>
//               <linearGradient id="colorPeople" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#3f80ff" stopOpacity={0.4} />
//                 <stop offset="100%" stopColor="#3f80ff" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="hour" />
//             <YAxis />
//             <Tooltip />
//             <Area
//               type="monotone"
//               dataKey="people"
//               stroke="#3f80ff"
//               fillOpacity={1}
//               fill="url(#colorPeople)"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       )}

//       <p style={{ textAlign: "center", marginTop: "1rem", color: "#555" }}>
//         שעות שיא: 12:00–14:00 | ממוצע יומי: 38 מבקרים בשעה
//       </p>

//       {Data.length > 0 && ID_video && (
//         <SaveAnalysis ID_video={ID_video} data={Data} />
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import SaveAnalysis from "./SaveAnalysis";

export default function PeopleChart() {
  const [Data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isFromMongo, setIsFromMongo] = useState(false); // ← דגל חדש
  const location = useLocation();
  const { showChart, recordingName, ID_video, peopleData } = location.state || {};

  useEffect(() => {
    if (!recordingName) return;

    // אם יש נתונים מוכנים - נשתמש בהם
    if (peopleData && peopleData.length > 0) {
      console.log("📊 משתמשים ב-peopleData שהועבר מהניווט");
      setData(peopleData);
      setIsFromMongo(true); // ← הנתונים הגיעו ממונגו
      return;
    }

    // אם אין נתונים - מבצעים fetch
    console.log("📤 שולח את שם ההקלטה לשרת:", recordingName);

    fetch("http://localhost:5000/people-per-minute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recordingName })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`שגיאה מהשרת: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ קיבלנו את הנתונים:", data);
        setData(data);
        setIsFromMongo(false); // ← הנתונים הגיעו עכשיו מפייתון, ולכן ניתן לשמור אותם
      })
      .catch((err) => {
        console.error("❌ שגיאה בעת שליחת הבקשה:", err);
        setError(err.message);
      });

  }, [recordingName, peopleData]);

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

      {/* שמירה רק אם הנתונים לא הגיעו ממונגו */}
      {Data.length > 0 && ID_video && !isFromMongo && (
        <SaveAnalysis ID_video={ID_video} data={Data} />
      )}
    </div>
  );
}
