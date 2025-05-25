import React, { useState } from "react";
import AxiosLogin from "./AxiosLogin";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "../../CSS/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberData, setMemberData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      setMemberData({ email, password });
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

      <Card className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="p-fluid">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
            className="input"
            placeholder="Enter your password"
            required
          />

          <Button
            label="Login"
            icon="pi pi-sign-in"
            type="submit"
            className="login-btn"
          />
        </form>

        {memberData && <AxiosLogin memberData={memberData} />}
      </Card>
    </div>
  );
};

export default Login;
