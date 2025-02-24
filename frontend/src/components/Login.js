


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login Here</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <br></br><br></br>
        <label className="block mb-1"> Email:</label>
        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br></br><br></br>
        <label className="block mb-1"> Password:</label>
        <input type="password"placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br><br></br><br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


export default Login;
