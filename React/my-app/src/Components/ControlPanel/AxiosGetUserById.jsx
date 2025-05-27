
import axios from 'axios';

const AxiosGetUserById = async (id) => {
  const response = await axios.get(`http://localhost:8080/Administators/getUserById/${id}`);
  console.log(">>> response.data:", response.data); // 💡 זה חשוב
    console.log(">>> response.data:", id); // 💡 זה חשוב

  return response.data;
};

export default AxiosGetUserById;
