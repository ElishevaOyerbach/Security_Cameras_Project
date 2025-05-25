import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <svg
        className="background-graph"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        <path
          d="M0,300 
             C100,200 200,400 300,300 
             C400,200 500,400 600,300 
             C700,200 800,400 800,400 
             L800,600 L0,600 Z"
          fill="var(--line-green)"
        />
      </svg>

      <div className="card">
        <h1 className="title">Welcome to the Security Camera System</h1>
        <div className="button-group">
          <Link to="/Login">
            <Button label="Login" className="p-button-rounded login-button" />
          </Link>
          <Link to="/SignIn">
            <Button label="Sign In" className="p-button-rounded signin-button" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
