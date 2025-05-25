import axios from 'axios';

const AxiosGetAdministratorIdByMember = async (memberId) => {
  try {
    const response = await axios.get(`http://localhost:8080/Members/getAdministratorIdByMember/${memberId}`);
    console.log(">>> response.data:", response.data); // 💡 פלט הנתונים שהגיע מהשרת
    console.log(">>> memberId:", memberId); // 💡 פלט מזהה העובד שנשלח

    return response.data.administratorId; // נחזיר רק את מזהה המנהל
  } catch (error) {
    console.error("שגיאה בשליפת מזהה מנהל:", error);
    throw error; // אפשר לטפל בזה בקומפוננטה שקוראת לפונקציה
  }
};

export default AxiosGetAdministratorIdByMember;
