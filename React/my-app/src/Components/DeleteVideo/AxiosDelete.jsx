
import axios from 'axios';

const AxiosDelete = async ({ recordingId, onDeleteSuccess }) => {
    console.log('Trying to delete recordingId:', recordingId);
  try {
    const response = await axios.delete(`http://localhost:8080/SecurityCameras/deleteSecurityCamera/${recordingId}`);
    console.log('ההסרטה נמחקה בהצלחה');
    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  } catch (error) {
    console.error('שגיאה במחיקת ההסרטה:', error);
  }
};

export default AxiosDelete;
