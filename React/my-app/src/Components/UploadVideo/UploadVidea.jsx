import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';

const UploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const admin = useSelector((state) => state.AdministratorSlice);
  const user = useSelector((state) => state.UserSlice);
  const adminId = admin._id;

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
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

    } catch (error) {
      console.error('שגיאה בהעלאת הסרטון:', error);
      alert('ההעלאה נכשלה.');
    } finally {
      setLoading(false);
    }
  };
  const redCursor = `url("data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'>
      <circle cx='16' cy='16' r='6' fill='red' />
    </svg>
  ") 16 16, auto`;

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 align-items-center mt-2">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="upload-input"
      />
      <label htmlFor="upload-input">
        <Button
          label="בחר מצלמה"
          icon="pi pi-upload"
          className="p-button-outlined"
          type="button"
          tooltip={user.role === "Member" ? 'אין לך הרשאה להעלות סרטון' : ''}
          onClick={() => {
            if (loading || user.role === "Member") return;
            document.getElementById("upload-input").click();
          }}
          style={{
            cursor:
              user.role === "Member"
                ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='16' cy='16' r='6' fill='red' /></svg>") 16 16, auto`
                : 'pointer',
            opacity: user.role === "Member" || loading ? 0.5 : 1, // הדמיית השבתה ויזואלית
          }}
        />

      </label>
      <Button
        label={loading ? 'מעלה...' : 'העלה וידאו'}
        icon="pi pi-check"
        className="p-button-primary"
        type="submit"
        disabled={loading || user.role === "Member"}
        tooltip={user.role === "Member" ? 'אין לך הרשאה להעלות סרטון' : ''}
      />
    </form>
  );
};

export default UploadVideo;
