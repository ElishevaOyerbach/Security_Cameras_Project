import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SideBar = ({ children }) => {
  const userSlice = useSelector((state) => state.UserSlice);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
     <style>{`
  .layout {
    display: flex;
    font-family: 'Arial', sans-serif;
    background-color: #2b2f3f; /* רקע כללי */
  }

  .custom-sidebar {
    width: 230px;
    background: linear-gradient(to bottom, #383c4d, #2b2f3f);
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
    transition: transform 0.3s ease;
  }

  .custom-sidebar .logo {
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 2rem;
    color: #29cc8b;
  }

  .custom-sidebar .menu a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.3s, color 0.3s;
  }

  .custom-sidebar .menu a:hover {
    background-color: rgba(41, 204, 139, 0.15); /* ירוק שקוף */
    color: #29cc8b;
  }

  .custom-sidebar .menu i {
    color: #29cc8b;
  }

  .footer {
    text-align: center;
    padding-top: 2rem;
    font-size: 0.9rem;
    color: #d0d0d0;
  }

  .avatar {
    background-color: #29cc8b;
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

  .main-content {
    flex: 1;
    margin-left: 230px;
    padding: 1rem;
    transition: margin-left 0.3s ease;
    background-color: #2b2f3f;
    min-height: 100vh;
    color: white;
  }

  .mobile-toggle {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    background-color: #29cc8b;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    z-index: 1100;
    border-radius: 4px;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    .custom-sidebar {
      transform: translateX(-100%);
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
          <div>
            <div className="logo">SecurityVision</div>
            <div className="menu" onClick={() => setIsMobileOpen(false)}>
              <Link to="/ControlPanel"><i className="pi pi-home"></i> לוח</Link>
              <Link to="/GetSecurity"><i className="pi pi-video"></i> Cameras</Link>
              <Link to="/Table"><i className="pi pi-users"></i> Table Members</Link>
              <Link to="/analysis"><i className="pi pi-chart-line"></i> Analysis</Link>
              <Link to="/storage"><i className="pi pi-server"></i> Storage</Link>
              <Link to="/settings"><i className="pi pi-cog"></i> Settings</Link>
              <Link to="/login"><i className="pi pi-sign-in"></i> Login</Link>
            </div>
          </div>
          <div className="footer">
            <div>Security Inc.</div>
            <div className="footer-sub">Premium Member</div>
            {userSlice?.name && (
              <div className="avatar">{userSlice.name[0]}</div>
            )}
          </div>
        </div>

        <div className="main-content" onClick={() => setIsMobileOpen(false)}>
          {children}
        </div>
      </div>
    </>
  );
};

export default SideBar;
