// import React, { useEffect } from "react";
// import PeopleChart from "./Try"; // קומפוננטת הגרף הקיימת שלך


// import React from "react";
// import PeopleChart from "./Try"; // קומפוננטת הגרף הקיימת שלך
// import { useLocation } from "react-router-dom";

// const Dashboard=(propst)=> {
//     const location = useLocation();
//   const { showChart, recordingName } = location.state || {};

//   return (
//     <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto", direction: "rtl" }}>
//       {/* כרטיס 1 - הגרף */}
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: "12px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           padding: "1rem",
//           marginBottom: "1.5rem",
//         }}
//       >
//         <PeopleChart />
//       </div>

//       {/* כרטיס 2 - דמוגרפיה + וידאו */}
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: "12px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           padding: "1rem",
//         }}
//       >
//         <h2 style={{ marginBottom: "0.5rem" }}>דמוגרפיה</h2>
//         <p style={{ marginBottom: "1rem", color: "#666" }}>
//           פילוח גילאים ומגדר של הלקוחות
//         </p>

//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
//           <div><strong>התפלגות גילאים</strong></div>
//           <div><strong>התפלגות מגדרית</strong></div>
//         </div>

//         {/* סרטון */}
//         <video
//           controls
//           style={{
//             width: "100%",
//             borderRadius: "8px",
//             border: "1px solid #ddd",
//           }}
//         >
//           <source src="/demo-video.mp4" type="video/mp4" />
//           הדפדפן שלך לא תומך בצפייה בסרטונים.
//         </video>
//       </div>
//     </div>
//   );
// }
// export default Dashboard;
// import React from "react";
// import PeopleChart from "./Try"; // קומפוננטת הגרף הקיימת שלך
// import { useLocation } from "react-router-dom";

// const Dashboard=(propst)=> {
//     const location = useLocation();
//   const { showChart, recordingName } = location.state || {};

//   return (
//     <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto", direction: "rtl" }}>
//       {/* כרטיס 1 - הגרף */}
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: "12px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           padding: "1rem",
//           marginBottom: "1.5rem",
//         }}
//       >
//         <PeopleChart />
//       </div>

//       {/* כרטיס 2 - דמוגרפיה + וידאו */}
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: "12px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           padding: "1rem",
//         }}
//       >
//         <h2 style={{ marginBottom: "0.5rem" }}>דמוגרפיה</h2>
//         <p style={{ marginBottom: "1rem", color: "#666" }}>
//           פילוח גילאים ומגדר של הלקוחות
//         </p>

//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
//           <div><strong>התפלגות גילאים</strong></div>
//           <div><strong>התפלגות מגדרית</strong></div>
//         </div>

//         {/* סרטון */}
//         <video
//           controls
//           style={{
//             width: "100%",
//             borderRadius: "8px",
//             border: "1px solid #ddd",
//           }}
//         >
//           <source src="/demo-video.mp4" type="video/mp4" />
//           הדפדפן שלך לא תומך בצפייה בסרטונים.
//         </video>
//       </div>
//     </div>
//   );
// }
// export default Dashboard;
import React, { useEffect } from "react";
import PeopleChart from "./Try"; // קומפוננטת הגרף הקיימת שלך

const Anyles=()=> {
 

  return (
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto", direction: "rtl" }}>
      {/* כרטיס 1 - הגרף */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* <PeopleChart/> */}
      </div>

      {/* כרטיס 2 - דמוגרפיה + וידאו */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>דמוגרפיה</h2>
        <p style={{ marginBottom: "1rem", color: "#666" }}>
          פילוח גילאים ומגדר של הלקוחות
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div><strong>התפלגות גילאים</strong></div>
          <div><strong>התפלגות מגדרית</strong></div>
        </div>

      </div>
    </div>
  );
}
export default Anyles;
