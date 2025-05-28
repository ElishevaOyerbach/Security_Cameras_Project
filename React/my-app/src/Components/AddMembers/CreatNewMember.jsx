
// import React, { useState } from 'react';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Password } from 'primereact/password';
// import { MultiSelect } from 'primereact/multiselect';
// import { Button } from 'primereact/button';
// import { useSelector } from 'react-redux';
// import ALL_PERMISSIONS from '../AddMembers/AllPermissions';
// import AxiosCreteMemberByAdministrator from './AxiosCreateMemberByAdministrator';

// const CreateNewMember = ({ visible, onClose }) => {
//     const [flag, setFlag] = useState(false);
//     const [formData, setFormData] = useState({
//         _id: "",
//         Name: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirm: "",
//         role: "Member",
//         prefix: "972",
//         AccessPermissions: [],
//         administartorID: "",
//     });

//     const user = useSelector((state) => state.UserSlice);
//     const ID = user._id;

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handlePermissionsChange = (e) => {
//         setFormData({ ...formData, AccessPermissions: e.value });
//     };

//     const handleSave = () => {
//         if (formData.password !== formData.confirm) {
//             alert("הסיסמאות לא תואמות");
//             return;
//         }

//         setFormData({ ...formData, _id: ID, administartorID: ID });
//         setFlag(true);
//         onClose();
//     };

//     const handleCancel = () => {
//         onClose();
//     };

//     return (
//         <>
//             <Dialog header="Member Details" visible={visible} onHide={onClose} footer={null}>
//                 <div className="form-container">
//                     <div className="field">
//                         <label htmlFor="Name">Name</label>
//                         <InputText name="Name" value={formData.Name} onChange={handleChange} />
//                     </div>

//                     <div className="field">
//                         <label htmlFor="password">Password</label>
//                         <Password name="password" value={formData.password} onChange={handleChange} toggleMask />
//                     </div>

//                     <div className="field">
//                         <label htmlFor="confirm">Confirm Password</label>
//                         <Password name="confirm" value={formData.confirm} onChange={handleChange} toggleMask />
//                     </div>

//                     <div className="field">
//                         <label htmlFor="email">Email</label>
//                         <InputText name="email" value={formData.email} onChange={handleChange} />
//                     </div>

//                     <div className="field">
//                         <label htmlFor="phone">Phone</label>
//                         <InputText name="phone" value={formData.phone} onChange={handleChange} />
//                     </div>

//                     <div className="field">
//                         <label htmlFor="AccessPermissions">Permissions</label>
//                         <MultiSelect
//                             name="AccessPermissions"
//                             value={formData.AccessPermissions}
//                             options={ALL_PERMISSIONS.map(p => ({ label: p, value: p }))}
//                             onChange={handlePermissionsChange}
//                             placeholder="Select Access"
//                             display="chip"
//                         />
//                     </div>

//                     <div className="buttons">
//                         <Button label="Cancel" className="p-button-text" onClick={handleCancel} />
//                         <Button label="Save" icon="pi pi-check" onClick={handleSave} />
//                     </div>
//                 </div>
//             </Dialog>

//             {flag && <AxiosCreteMemberByAdministrator ID={ID} memberData={formData} />}

//             <style jsx>{`
//                 .form-container {
//                     display: flex;
//                     flex-direction: column;
//                     gap: 1rem;
//                 }

//                 .field {
//                     display: flex;
//                     flex-direction: column;
//                 }

//                 .field label {
//                     font-weight: bold;
//                     margin-bottom: 0.5rem;
//                 }

//                 .buttons {
//                     display: flex;
//                     justify-content: flex-end;
//                     gap: 1rem;
//                     margin-top: 1rem;
//                 }

//                 /* אחידות לשדות */
//                 .p-inputtext, .p-password-input, .p-multiselect {
//                     background-color: white !important;
//                     border: 1px solid #ccc;
//                     border-radius: 6px;
//                 }

//             `}</style>
//         </>
//     );
// };

// export default CreateNewMember;
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import ALL_PERMISSIONS from '../AddMembers/AllPermissions';
import AxiosCreteMemberByAdministrator from './AxiosCreateMemberByAdministrator';

const CreateNewMember = ({ visible, onClose }) => {
    const [flag, setFlag] = useState(false);
    const [formData, setFormData] = useState({
        _id: "",
        Name: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
        role: "Member",
        prefix: "972",
        AccessPermissions: [],
        administartorID: "",
    });

    const user = useSelector((state) => state.UserSlice);
    const ID = user._id;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePermissionsChange = (e) => {
        setFormData({ ...formData, AccessPermissions: e.value });
    };

    const handleSave = () => {
        if (formData.password !== formData.confirm) {
            alert("הסיסמאות לא תואמות");
            return;
        }

        setFormData({ ...formData, _id: ID, administartorID: ID });
        setFlag(true);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <>
            <Dialog header="Member Details" visible={visible} onHide={onClose} footer={null}>
                <div className="form-container">
                    <div className="field">
                        <label htmlFor="Name">Name</label>
                        <InputText name="Name" value={formData.Name} onChange={handleChange} />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <Password name="password" value={formData.password} onChange={handleChange} toggleMask />
                    </div>

                    <div className="field">
                        <label htmlFor="confirm">Confirm Password</label>
                        <Password name="confirm" value={formData.confirm} onChange={handleChange} toggleMask />
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <InputText name="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <InputText name="phone" value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className="field">
                        <label htmlFor="AccessPermissions">Permissions</label>
                        <MultiSelect
                            name="AccessPermissions"
                            value={formData.AccessPermissions}
                            options={ALL_PERMISSIONS.map(p => ({ label: p, value: p }))}
                            onChange={handlePermissionsChange}
                            placeholder="Select Access"
                            display="chip"
                        />
                    </div>

                    <div className="buttons">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" onClick={handleCancel} />
                        <Button label="Save" icon="pi pi-check" className="p-button-success" onClick={handleSave} />

                    </div>
                </div>
            </Dialog>

            {flag && <AxiosCreteMemberByAdministrator ID={ID} memberData={formData} />}

            <style jsx>{`
                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .field {
                    display: flex;
                    flex-direction: column;
                }

                .field label {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color:#2b2f3f;
                }

                .buttons {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                /* אחידות לשדות */
                .p-inputtext, .p-password-input, .p-multiselect {
                    background-color: white !important;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                }

            `}</style>
        </>
    );
};

export default CreateNewMember;
