import { useEffect, useRef } from "react";
import axios from "axios";

export default function SaveAnalysis({ ID_video, data }) {
  const hasSentRef = useRef(false);

  useEffect(() => {
    if (hasSentRef.current || !ID_video || !Array.isArray(data) || data.length === 0) {
      if (!ID_video || !data || data.length === 0) {
        console.warn("❗ אין מזהה הקלטה או שהמערך ריק");
      }
      return;
    }

    const controller = new AbortController();

    const sendAnalysis = async () => {
      try {
        console.log("📤 שומר ניתוח נתונים לשרת...");

        const res = await axios.post(
          `http://localhost:8080/SecurityCameras/addPeopleAnalysis/${ID_video}`,
          { peoplePerMinute: data },
          { signal: controller.signal }
        );

        console.log("✅ הנתונים נשמרו בהצלחה:", res.data);
        hasSentRef.current = true;
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("הבקשה בוטלה");
        } else {
          console.error("❌ שגיאה בעת שמירת הנתונים:", err);
        }
      }
    };

    sendAnalysis();

    return () => controller.abort();
  }, [ID_video, data]);

  return null; // קומפוננטת שירות בלבד, ללא רינדור
}
