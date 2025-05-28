// import React, { useState } from "react";
// import axios from "axios";

// const AxiosDeleteMember=({memberId, adminId})=> {
//   // const [adminId, setAdminId] = useState("68043ccf8b5cb28fe901eb41"); // מזהה מנהל
//   // const [memberId, setMemberId] = useState("68054a8c4009c468bc1a1ef9"); // מזהה עובד
//   console.log("memberId", memberId);
//   console.log("adminId", adminId);
//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:8080/Administators/deleteMemberByAdministrator/${adminId}`,
//         {
//           data: { memberId },
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         }
//       );
//     } catch (error) {
//       console.error("שגיאה במחיקה:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleDelete}>מחק עובד</button>
//     </div>
//   );
// }

// export default AxiosDeleteMember;
import axios from "axios";

const AxiosDeleteMember = async (memberId, adminId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/Administators/deleteMemberByAdministrator/${adminId}`,
      {
        data: { memberId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("נמחק בהצלחה", response.data);
    return response.data;
  } catch (error) {
    console.error("שגיאה במחיקה:", error);
    throw error;
  }
};

export default AxiosDeleteMember;
