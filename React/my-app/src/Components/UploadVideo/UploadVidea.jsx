// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from 'primereact/button';

// const UploadVideo = () => {
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const admin = useSelector((state) => state.AdministratorSlice);
//   const user = useSelector((state) => state.UserSlice);
//   const member = useSelector((state) => state.MemberSlice);
//   const [arrPermitions, setArrPermitions] = useState([]);
//   const token = localStorage.getItem("token");

//   const adminId = admin._id;
//   useEffect(() => {
//     if (user.role === "Member") {
//       setArrPermitions(member.arrPermetion || []);
//     } else {
//       setArrPermitions([]);
//     }
//   }, [user, member]);


//   const handleFileChange = (e) => {
//     setVideo(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!video) {
//       alert('יש לבחור קובץ וידאו קודם.');
//       return;
//     }

//     if (!token) {
//       setError("Token is missing. Please log in again.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', video);
//     formData.append('length', 70);
//     formData.append('administartorID', adminId);

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `http://localhost:8080/Administators/createSecurityCamerasByAdministrator/${adminId}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert('הסרטון הועלה בהצלחה!');
//       console.log(response.data);
//     } catch (error) {
//       console.error('שגיאה בהעלאת הסרטון:', error);
//       alert('ההעלאה נכשלה.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const isButtonDisabled = user.role === "Member" && arrPermitions.length === 0;
//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2 align-items-center mt-2">
//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//         id="upload-input"
//       />
//       <label htmlFor="upload-input">
//         <Button
//           disabled={isButtonDisabled}
//           color='var(--accent-green)'
//           label="בחר מצלמה"
//           icon="pi pi-upload"
//           className="p-button-outlined"
//           type="button"
//           style={{
//             borderColor: 'var(--accent-green)',
//             color: 'var(--accent-green)',
//             boxShadow: '0 0 8px #29cc8b',
//           }}
//           onClick={() => {
//             if (!isButtonDisabled) {
//               document.getElementById("upload-input").click();
//             }
//           }}
//         />
//       </label>
//       <Button
//         label={loading ? 'מעלה...' : 'העלה וידאו'}
//         icon="pi pi-check"
//         className="p-button"
//         type="submit"
//         disabled={loading || isButtonDisabled}
//         style={{
//           backgroundColor: 'var(--accent-green)',
//           borderColor: 'var(--accent-green)',
//           color: 'var(--card-bg)',
//           boxShadow: '0 0 8px #29cc8b',

//         }}
//       />
//     </form>
//   );
// };

// export default UploadVideo;
/////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { set } from 'react-hook-form';
import AxiosGetUserById from '../ControlPanel/AxiosGetUserById';
import HasPermission from '../AddMembers/hasPermission';

const UploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.UserSlice);

  const [fullUser, setFullUser] = useState(null); // 
  const [arrPermitions, setArrPermitions] = useState([]);
  const token = localStorage.getItem("token");

  const [adminId, setAdminID] = useState("");

  useEffect(() => {
    const fetchFullUser = async () => {
      try {
        const data = await AxiosGetUserById(user._id);
        setFullUser(data.user);
      } catch (err) {
        console.error("שגיאה בקבלת פרטי המשתמש:", err);
        setError("שגיאה בטעינת פרטי המשתמש.");
      }
    };

    if (user?._id && token) {
      fetchFullUser();
    }
  }, [user, token]);
  useEffect(() => {
    if (!fullUser) return;
    if (user.role === "Member") {
      setArrPermitions(fullUser.arrPermetion || []);
      setAdminID(fullUser.administartorID);
    } else {
      setArrPermitions([]);
      setAdminID(fullUser._id);
    }
  }, [user, fullUser]);

  const isButtonDisabled = !HasPermission("add security", arrPermitions, user.role);


  const handleFileSelect = (event) => {
    setVideo(event.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      alert('יש לבחור קובץ וידאו קודם.');
      return;
    }

    if (!token) {
      setError("Token is missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('length', 70);
    formData.append('administartorID', adminId);

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8080/Administators/createSecurityCamerasByAdministrator/${adminId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('הסרטון הועלה בהצלחה!');
      console.log(response.data);
    } catch (error) {
      console.error('שגיאה בהעלאת הסרטון:', error);
      alert('ההעלאה נכשלה.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex gap-2 align-items-center mt-2">
      <FileUpload
        name="video"
        accept="video/*"
        mode="basic"
        customUpload
        onSelect={(e) => setVideo(e.files[0])} // <-- זה התיקון
        disabled={isButtonDisabled}
        chooseLabel="בחר מצלמה"
        className="custom-upload-button"
      />

      <Button
        label={loading ? 'מעלה...' : 'העלה וידאו'}
        icon="pi pi-check"
        className="p-button"
        type="submit"
        disabled={loading || isButtonDisabled}
        style={{
          backgroundColor: 'var(--accent-green)',
          borderColor: 'var(--accent-green)',
          color: 'var(--card-bg)',
          boxShadow: '0 0 8px #29cc8b',
        }}
      />
    </form>
  );
};

export default UploadVideo;

