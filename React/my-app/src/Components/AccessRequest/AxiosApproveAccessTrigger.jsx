import { useEffect } from 'react';
import axios from 'axios';

const AxiosApproveAccessTrigger = ({ request, onFinish }) => {
    useEffect(() => {
        const sendApproval = async () => {
            try {
                await axios.post('http://localhost:8080/Administators/approveAccessRequest/', {
                    memberId: request.memberId,
                    accessType: request.accessType,
                    dateRequested: request.dateRequested,
                });
                if (onFinish) onFinish(true);
            } catch (error) {
                console.error('שגיאה באישור הבקשה:', error);
                if (onFinish) onFinish(false);
            }
        };

        sendApproval();
    }, [request, onFinish]);

    return null;
};

export default AxiosApproveAccessTrigger;
