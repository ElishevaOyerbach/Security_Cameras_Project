// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { Create_Member } from '../../Store/MemberSlice';
// import { Create_Administrator } from '../../Store/AdministratorSlice';
// import { Create_User } from '../../Store/UserSlice';
// const AxiosLogin = ({ memberData }) => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const handleLogin = async () => {
//             try {
//                 const response = await axios.post(
//                     `http://localhost:8080/Administators/loginAdministrator`,
//                     {
//                         email: memberData.email,
//                         password: memberData.password,
//                     }
//                 );

//                 const token = response.data.token;
//                 localStorage.setItem('token', token);
//                 //בשביל הריענון של המסך
//                 localStorage.setItem('user', JSON.stringify(response.data.user));
//                 localStorage.setItem('role', response.data.role);
//                 //

//                 // if (response.data.role === 'Member') {
//                 //     dispatch(Create_Member(response.data.user));
//                 // } else {
//                 //     dispatch(Create_Administrator(response.data.user));
//                 // }
//                 dispatch(Create_User({
//                     _id: response.data.user._id,
//                     name: response.data.user.name,
//                     role: response.data.role,
//                     email: response.data.user.email
//                 }));
//                 console.log('Login successful!', memberData);
//                 alert('Login successful!');
//             } catch (error) {
//                 const message =
//                     error.response?.data?.message || 'Unexpected error occurred';
//                 console.error('Login failed:', message);
//                 alert('Login failed: ' + message);
//             }
//         };

//         handleLogin();
//     }, [memberData, dispatch]);

//     return null; // לא צריך להציג שום דבר
// };

// export default AxiosLogin;
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Create_Member } from '../../Store/MemberSlice';
import { Create_Administrator } from '../../Store/AdministratorSlice';
import { Create_User } from '../../Store/UserSlice';
const AxiosLogin = ({ memberData, onSuccess }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    if (!memberData) return; // 🛡️ הגנה מפני null

    const handleLogin = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:8080/Administators/loginAdministrator`,
                {
                    email: memberData.email,
                    password: memberData.password,
                }
            );

            if (!data || !data.user || !data.role || !data.token) {
                throw new Error("Missing data from response");
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('role', data.role);

            dispatch(Create_User({
                _id: data.user._id,
                name: data.user.name,
                role: data.role,
                email: data.user.email
            }));

            console.log('Login successful!', memberData);
            alert('Login successful!');
            onSuccess();
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Unexpected error occurred';
            console.error('Login failed:', message);
            alert('Login failed: ' + message);
        }
    };

    handleLogin();
}, [memberData, dispatch, onSuccess]);


    return null; // לא צריך להציג שום דבר
};

export default AxiosLogin;
