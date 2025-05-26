import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import SideBar from './Components/SideBar';
// import GetSecurity from './Components/GetSecurity'; // לא בשימוש
// import ControlPanel from './Components/ControlPanel/ControlPanel'; // לא בשימוש
import CreatNewMember from './Components/AddMembers/CreatNewMember';
import PeopleChart from './Components/ControlPanel/Try'
import Dashboard from './Components/Analys/Anyles';
import UploadVideo from './Components/UploadVideo/UploadVidea';
import SighInAdministrator from './Components/SighInAdministrator';
import VideoProcessingOverlay from './Components/Laoding';
import { useDispatch } from 'react-redux';
import { Create_User } from './Store/UserSlice';
import MultiRecordingChart from './Components/ControlPanel/MultiAnalysFromAdmin'
const LazyLogin = React.lazy(() => import('./Components/Login/Login'));
const LazySignIn = React.lazy(() => import('./Components/SighInAdministrator'));
const LazyHome = React.lazy(() => import('./Components/Home'));
const LazyPersonalArea = React.lazy(() => import('./Components/PersonalArea'));
const LazyGetSecurity = React.lazy(() => import('./Components/GetSecurity'));
const LazyTable = React.lazy(() => import('./Components/TableMembers/Table'));
const LazyControlPanel = React.lazy(() => import('./Components/ControlPanel/ControlPanel'));
const LazyDashboard = React.lazy(() => import('./Components/Analys/Try'));



function LayoutWithSidebar({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flex: 1, padding: '0.5rem 0.5rem 0.5rem 0.5px' }}>
        {children}
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={'loading...'}><LazyHome /></Suspense>} />
      <Route path="/SignIn" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazySignIn /></Suspense></LayoutWithSidebar>} />
      <Route path="/Login" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazyLogin /></Suspense></LayoutWithSidebar>} />
      <Route path="/Login/PersonalArea" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazyPersonalArea /></Suspense></LayoutWithSidebar>} />
      <Route path="/GetSecurity" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazyGetSecurity /></Suspense></LayoutWithSidebar>} />
      <Route path="/Table" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazyTable /></Suspense></LayoutWithSidebar>} />
      <Route path="/ControlPanel" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazyControlPanel /></Suspense></LayoutWithSidebar>} />
      <Route path="/analysis" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazyDashboard /></Suspense></LayoutWithSidebar>} />

    </Routes>
  );
}
function App() {
    const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (userData && role) {
      const user = JSON.parse(userData);
      dispatch(Create_User({ ...user, role }));
    }
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <AppContent />
      
    </BrowserRouter>
  );
}

export default App;
