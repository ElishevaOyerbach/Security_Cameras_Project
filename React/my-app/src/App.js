import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import UploadVideo from './Components/UploadVideo/UploadVidea';
import GetAllmembersName from './Components/GetAllMembersName/GetAllmembersName';
import fetchVideo from './Components/GetSecurity';
import Table from './Components/TableMembers/Table';
import SighInAdministrator from './Components/SighInAdministrator';
import CreatNewMember from './Components/AddMembers/CreatNewMember';

import 'primereact/resources/themes/lara-light-indigo/theme.css';  // theme
import 'primereact/resources/primereact.min.css';                  // core css
import 'primeicons/primeicons.css';                                // icons
import 'primeflex/primeflex.css';    



import { Video } from 'lucide-react';
import VideoCard  from './Components/GetSecurity';
import Login from './Components/Login/Login';
import GetSecurity from './Components/GetSecurity';


// import AxiosDeleteMember from './Components/DeleteMember/AxiosDeleteMember';
const LazyNavBar = React.lazy(() => import('./Components/NavBar'))
const LazyLogin = React.lazy(() => import('./Components/Login/Login'))
const LazySighIn = React.lazy(() => import('./Components/SighInAdministrator'))
const LazyHome = React.lazy(() => import('./Components/Home'))

function App() {
  return (


    <>
   

      <BrowserRouter>

        

        <Suspense fallback={'loading...'}><LazyNavBar /></Suspense>
          
        <Routes>
          <Route path="/" element={<Suspense fallback={'loading...'}><LazyHome /></Suspense>} />
          <Route path="/Sigh-In" element={<Suspense fallback={'loading...'}><LazySighIn /></Suspense>} />
          <Route path="/Login" element={<Suspense fallback={'loading...'}><LazyLogin /></Suspense>} />
        </Routes> 
      </BrowserRouter>
      {/* <Login/> */}
     {/* <UploadVideo/>
  <GetSecurity/> */}
      {/* <GetAllmembersName/> */}
      <Table/>

    </>


  );
}

export default App;
