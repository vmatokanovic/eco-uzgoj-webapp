import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import "./Login.css";
import logo from "../../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card-container">
        <div className="login-card">
          <div className="login-card-logo">
            <img src={logo} alt="Logo plant" />
          </div>
          <div className="login-card-header">
            <h1>Login</h1>
            <div>
              <p>Please login to use all our features</p>
            </div>
          </div>
          <form className="login-card-form" onSubmit={handleSubmit}>
            <div className="form-item">
              <span className="form-item-icon material-symbols-rounded">
                person
              </span>
              <input
                className="form-input"
                placeholder="Username or e-mail"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-item">
              <span className="form-item-icon material-symbols-rounded">
                lock
              </span>
              <input
                className="form-input"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {/* <div className="form-item-other">
              <div className="checkbox">
                <input type="checkbox" id="rememberMeCheckbox" />
                <label htmlFor="rememberMeCheckbox">Remember me</label>
              </div>
            </div> */}
            <button disabled={isLoading}>Login</button>
          </form>
          <div className="login-card-footer">
            Don't have an account?{" "}
            <Link className="register-link" to="/register">
              Click here to register!
            </Link>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
