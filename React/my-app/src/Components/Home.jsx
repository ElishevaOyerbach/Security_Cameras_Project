import React, { useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteVideoAction from './DeleteVideoAction';

const Home = () => {
   const [shouldDelete, setShouldDelete] = useState(false);
  return(
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple home page component...</p>


            <Link to="/Login">Login</Link>
            <br></br>
            <Link to="/Sigh-In">Sign In</Link>

            <button
          onClick={() => setShouldDelete(true)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
        </button>
        {shouldDelete && (
        <DeleteVideoAction videoId={'682cf9c20513483851a66da5'} onDeleteSuccess={() => setShouldDelete(false)} />
      )}

    </div>  
  )
}

export default Home;
