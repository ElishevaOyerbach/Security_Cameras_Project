import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Create_Member } from '../../Store/MemberSlice';
import { Create_Administrator } from '../../Store/AdministratorSlice';
import { Create_User } from '../../Store/UserSlice';
const AxiosLogin = ({ memberData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleLogin = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:8080/Administators/loginAdministrator`,
                    {
                        email: memberData.email,
                        password: memberData.password,
                    }
                );

                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('Response:', response.data); // הוספת לוג כדי לבדוק את התגובה

                if (response.data.role === 'Member') {
                    
                    dispatch(Create_Member(response.data.user));
                } else {
                    dispatch(Create_Administrator(response.data.user));
                }
                dispatch(Create_User({ role: response.data.role ,name: response.data.user.name}));
                console.log('Login successful!', memberData);
                alert('Login successful!');
            } catch (error) {
                const message =
                    error.response?.data?.message || 'Unexpected error occurred';
                console.error('Login failed:', message);
                alert('Login failed: ' + message);
            }
        };

        handleLogin();
    }, [memberData, dispatch]);

    return null; // לא צריך להציג שום דבר
};

export default AxiosLogin;
