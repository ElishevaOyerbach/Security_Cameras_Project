
import axios from 'axios';

const AxiosMultiAnalyseFromAdmin = async (id) => {
  const response = await axios.get(`http://localhost:8080/Administators/getLast4SecurityCamerasByAdministrator/${id}`);
  console.log(">>> response.data:", response.data); // 💡 זה חשוב
    console.log(">>> response.data:", id); // 💡 זה חשוב

  return response.data;
};

export default AxiosMultiAnalyseFromAdmin;
