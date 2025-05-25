// hooks/usePeoplePerMinute.js
import { useState, useEffect } from "react";
import axios from "axios";

const AxiosPeoplePerMinute = ({recordingId}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recordingId) return;
    console.log("recording id",recordingId)    
    const fetchData = async () => {
    
      try {
        const res = await axios.get(
          `http://localhost:8080/SecurityCameras/getPeopleAnalysis/${recordingId}`
        );

        setData(res.data.peoplePerMinute || []);
      } catch (error) {
        console.error("שגיאה בקבלת הנתונים:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [recordingId]);
  return { data, loading };
};

export default AxiosPeoplePerMinute;
