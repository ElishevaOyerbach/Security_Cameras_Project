import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AxiosGetMembersName = () => {
    
  const user = useSelector((state) => state.UserSlice);
  if(user.role !== "Administrator"){
    
  }
  const administratorId = user._id;
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    async function fetchMembers() {
      try {
        const token = localStorage.getItem("token"); // אם אתה שומר את הטוקן ב-localStorage
        if (!token) {
          setError("Token is missing. Please log in again.");
          setLoading(false);
          return;
      }
        const response = await axios.get(
          `http://localhost:8080/Administators/getAllMembersNamesByAdministrator/${administratorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // הוספת הכותרת Authorization
            },
          }
        );   
    
        
        console.log("Response from server:", response.data);
       setMembers(response.data);
      } catch (err) {
        setError('Failed to fetch members.');
        console.error(err);//
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [administratorId]);

  return { members, loading, error };
};

export default AxiosGetMembersName;

