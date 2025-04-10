import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CreateAdministrator = () => {
    const adminData = useSelector((state) => state.AdministratorSlice); // כאן את מביאה את כל הנתונים מ־Redux
    console.log('Data being sent to server:', adminData); // לראות את הנתונים ששולחים לשרת

    const handleCreateAdmin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/Administrators/createAdministrator', 
                {
                ...adminData,
            });

            console.log('Administrator created successfully!', response.data.token);
            alert('Administrator created successfully!');
        } catch (error) {
            if (error.response) {
                console.error('Failed to create administrator:', error.response.data);
                alert('Failed to create administrator: ' + error.response.data.message);
            } else {
                console.error('Error during creation:', error.message);
                alert('Error during creation: ' + error.message);
            }
        }
    };

    return (
        <div>
            <h2>Create Administrator</h2>
            <button onClick={handleCreateAdmin}>Send</button>
        </div>
    );
};

export default CreateAdministrator;

