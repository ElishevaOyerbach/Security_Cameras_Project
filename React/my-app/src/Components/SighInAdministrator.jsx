import React, { useState } from 'react';
import '../../src/CSS/SignInAdministrator.css';
import CreateAdministrator from './CreateAdministrator';
import { sendVerificationEmail } from './EmailSender';

const SignInAdministrator = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        termsAccepted: false,
    });

    const [emailError, setEmailError] = useState('');
    const [shouldCreateAdmin, setShouldCreateAdmin] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [sentCode, setSentCode] = useState('');
    const [codeVerified, setCodeVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        if (name === 'email') {
            validateEmail(newValue);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(email) ? '' : 'Invalid email address');
    };

    const generateVerificationCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleSubmit = async () => {
        if (!formData.termsAccepted) {
            alert('You must accept the terms and conditions.');
            return;
        }

        if (emailError || !formData.email || !formData.name || !formData.password) {
            alert('Please complete the form correctly.');
            return;
        }

        if (hasSubmitted) return;

        const code = generateVerificationCode();
        setSentCode(code);
        await sendVerificationEmail(formData.email, code);

        setShouldCreateAdmin(false);
        setHasSubmitted(true);
    };

    const verifyCode = () => {
        if (verificationCode === sentCode) {
            setCodeVerified(true);
            setShouldCreateAdmin(true);
        } else {
            alert('Invalid verification code. Please try again.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-background">
                <svg className="login-graph" viewBox="0 0 800 600" preserveAspectRatio="none">
                    <path
                        d="M0,300 
                           C100,200 200,400 300,300 
                           C400,200 500,400 600,300 
                           C700,200 800,400 800,400 
                           L800,600 L0,600 Z"
                        fill="var(--accent-green)"
                        opacity="0.08"
                    />
                </svg>
            </div>

            <div className="admin-container">
                <div className="admin-card">
                    <h2 className="admin-title">Sing In</h2>

                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {emailError && <small className="error-text">{emailError}</small>}

                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="termsAccepted"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                        />
                        <label htmlFor="termsAccepted">I accept the terms and conditions</label>
                    </div>

                    <button onClick={handleSubmit} disabled={hasSubmitted}>
                        Sing In
                    </button>

                    {hasSubmitted && !codeVerified && (
                        <div className="verification-section">
                            <input
                                type="text"
                                placeholder="Enter verification code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <button onClick={verifyCode}>Verify</button>
                        </div>
                    )}
                </div>

                {shouldCreateAdmin && <CreateAdministrator adminData={formData} />}
            </div>
        </div>
    );
};

export default SignInAdministrator;
