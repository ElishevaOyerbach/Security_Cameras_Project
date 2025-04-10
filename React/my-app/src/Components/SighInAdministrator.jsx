import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Password } from 'primereact/password';
import { Create_Administrator } from '../Store/AdministratorSlice';
import CreateAdministrator from './CreateAdministrator';
const SighInAdministrator = () => {

    const Administrator = useSelector(a => a.AdministratorSlice);
    console.log(Administrator); 
    const dispatch = useDispatch();

    const [activeIndex, setActiveIndex] = useState(0);
    const [value, setValue] = useState('');

    const [formData, setFormData] = useState({
        name: "",
        email:  "",
        phone:  "",
        password: '125',
        // creditCard: '',
        arrMembers: [],
    });

    const items = [
        { label: 'Personal details' },
        { label: 'Verification' },
        { label: 'Add Members' },
        { label: 'Approval and completion' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // עדכון השדה לפי שם השדה והערך החדש
        }));
    };

    const handleNext = () => {
        if (activeIndex < items.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
    };

    const renderPersonalInfo = () => (
        <div>
            <h2> Personal details</h2>
            <div>
                <label> Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
        </div>
    );

    const renderVerification = () => (
        <div>
            <h2>Verification</h2>
            <label>Password:</label>
            <div className="card flex -content-center">
                <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
            </div>
            
            {/* <CreditCard /> */}
        </div>
    );
    const addMembers = () => (
        <div>
            <h2>Add members</h2>

        </div>
    );

    const renderConfirmation = () => (
        <div>
            <h2> </h2>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                    />
                    אני מאשרת את תנאי השימוש
                </label>
            </div>

            <button
                type="button"
                onClick={() => {
                    console.log("fromData"+formData); // הדפס את המידע שנשלח

                    dispatch(Create_Administrator({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        password: formData.password,
                        //
                        arrMembers: [],
                        arrSecurityCameras: [],
                        arrAnalysisSchema: []
                    }));
                }}
            >
                Create Administrator
            </button>
           
        </div>
    );


    const renderStepContent = () => {
        switch (activeIndex) {
            case 0:
                return renderPersonalInfo();
            case 1:
                return renderVerification();
            case 2:
                return addMembers();
            case 3:
                return renderConfirmation();
            default:
                return null;
        }
    };

    return (
        <div className="App" style={{ width: '60%', margin: '50px auto', direction: 'rtl' }}>
            <Steps model={items} activeIndex={activeIndex} />
            <form onSubmit={handleSubmit}>
                <div style={{ margin: '20px 0' }}>
                    {renderStepContent()}
                </div>
                <div>
                    <Button label="הקודם" icon="pi pi-angle-right" disabled={activeIndex === 0} onClick={handlePrev} className="p-button-secondary" style={{ marginLeft: '10px' }} />
                    {activeIndex < items.length - 1 ? (
                        <Button label="הבא" icon="pi pi-angle-left" iconPos="right" onClick={handleNext} />
                    ) : (
                        <Button type="submit" label="שלח" icon="pi pi-check" />
                    )}
                </div>
              
            </form>
         <CreateAdministrator/>
        </div>

    );
}

export default SighInAdministrator;