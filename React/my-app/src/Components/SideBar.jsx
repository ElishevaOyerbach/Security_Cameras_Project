import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const userSlice = useSelector((state) => state.UserSlice);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const toggleSidebar = () => setIsMobileOpen(!isMobileOpen);

    return (
        <>
            <style>{`
                .layout {
                    display: flex;
                    font-family: 'Arial', sans-serif;
                }
                .custom-sidebar {
                    width: 230px;
                    background-color: rgb(28, 153, 113);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 1rem;
                    position: fixed;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    height: 100vh;
                    z-index: 1000;
                }
                .custom-sidebar .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    padding-bottom: 2rem;
                }
                .custom-sidebar .menu a {
                    display: flex;
                    align-items: center;
                    padding: 0.75rem 1rem;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    transition: background 0.3s;
                }
                .custom-sidebar .menu a:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
                .footer {
                    text-align: center;
                    padding-top: 2rem;
                    font-size: 0.9rem;
                    color: #d0d0d0;
                }
                .avatar {
                    background-color: #5a4aff;
                    color: white;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    margin: 0.5rem auto 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }

                /* כפתור תפריט לנייד */
                .mobile-toggle {
                    display: none;
                    position: fixed;
                    top: 1rem;
                    left: 1rem;
                    background-color: rgb(28, 153, 113);
                    color: white;
                    padding: 0.5rem 1rem;
                    border: none;
                    z-index: 1100;
                    border-radius: 4px;
                    font-size: 1.2rem;
                }

                .main-content {
                    margin-left: 230px;
                    padding: 2rem;
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .custom-sidebar {
                        transform: translateX(-100%);
                        transition: transform 0.3s ease;
                    }
                    .custom-sidebar.open {
                        transform: translateX(0);
                    }
                    .main-content {
                        margin-left: 0;
                        padding-top: 4rem;
                    }
                    .mobile-toggle {
                        display: block;
                    }
                }
            `}</style>

            <button className="mobile-toggle" onClick={toggleSidebar}>☰</button>

            <div className="layout">
                <div className={`custom-sidebar ${isMobileOpen ? 'open' : ''}`}>
                    <div className="logo">SecurityVision</div>
                    <div className="menu" onClick={() => setIsMobileOpen(false)}>
                        <Link to="/ControlPanel"><i className="pi pi-video"></i> לוח </Link>
                        <Link to="/GetSecurity"><i className="pi pi-video"></i> Cameras</Link>
                        <Link to="/Table"><i className="pi pi-play"></i> Table Members</Link>
                        <Link to="/analysis"><i className="pi pi-chart-line"></i> Analysis</Link>
                        <Link to="/storage"><i className="pi pi-server"></i> Storage</Link>
                        <Link to="/settings"><i className="pi pi-cog"></i> Settings</Link>
                        <Link to="/login"><i className="pi pi-sign-in"></i> Login</Link>
                    </div>
                    <div className="footer">
                        <div>Security Inc.</div>
                        <div className="footer-sub">Premium Member</div>
                        <div className="avatar">{userSlice.name?.[0] || "?"}</div>
                    </div>
                </div>

                <div className="main-content">
                    {/* כאן יופיע התוכן של כל דף */}
                </div>
            </div>
        </>
    );
};

export default SideBar;
