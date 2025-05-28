import axios from 'axios';

const AxiosRequestAccess = async ({ memberId, accessType, text }) => {
    try {
        const response = await axios.post('http://localhost:8080/Administators/requestAccessFromAdmin', {
            memberId,
            accessType,
            text
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error sending access request:", error);
        return { success: false, error };
    }
}
export default AxiosRequestAccess;
