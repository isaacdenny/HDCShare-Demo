import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Components";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = "isaac";
  const pwd = "123";

  async function handleSubmit() {
    if (username === user && password === pwd) {
      return navigate("/");
    }
    return navigate("/login");
  }

  return (
    <>
      <Navbar />
      <div className="main-section">
        <div className="panel small">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
