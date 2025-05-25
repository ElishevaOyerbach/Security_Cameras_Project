// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function AxiosGetUserById({ id, onResult }) {
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!id) return;

//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/Administators/getUserById/${id}`);
//                 console.log(">>> response.data:", response.data); // 💡 זה חשוב
//                 if (onResult) {
//                     onResult(response.data); // שולחת את האובייקט המלא להורה
//                 }
//             } catch (err) {
//                 console.error("Error fetching user:", err);
//                 setError("User not found or error occurred.");
//             }
//         };

//         fetchUser();
//     }, [id, onResult]);

//     return (
//         <>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </>
//     );
// }

// export default AxiosGetUserById;
// AxiosGetUserById.js
import axios from 'axios';

const AxiosGetUserById = async (id) => {
  const response = await axios.get(`http://localhost:8080/Administators/getUserById/${id}`);
  console.log(">>> response.data:", response.data); // 💡 זה חשוב
    console.log(">>> response.data:", id); // 💡 זה חשוב

  return response.data;
};

export default AxiosGetUserById;
