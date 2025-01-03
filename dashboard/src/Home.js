import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const login = () => {
    // Mock login: Save token in localStorage
    localStorage.setItem("authToken", "mock-token");
    navigate("/dashboard");
  };

  return (
    <div style={{color: 'white'}}>
      <h1>Welcome to the Home Page</h1>
      <button onClick={login}>Login to Dashboard</button>
    </div>
  );
};

export default Home;
