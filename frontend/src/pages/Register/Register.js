import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import logo from "../../assets/logo.png";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, password);
  };

  return (
    <div className="register-container">
      {/* <form className="register-form" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <label>Korisničko ime:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <label>E-mail:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Lozinka:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form> */}

      <div className="login-card-container">
        <div className="login-card">
          <div className="login-card-logo">
            <img src={logo} alt="Logo plant" />
          </div>
          <div className="login-card-header">
            <h1>Register</h1>
            <div>
              <p>Please register your new account</p>
            </div>
          </div>
          <form className="login-card-form" onSubmit={handleSubmit}>
            <div className="form-item">
              <span className="form-item-icon material-symbols-rounded">
                person
              </span>
              <input
                className="form-input"
                placeholder="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="form-item">
              <span className="form-item-icon material-symbols-rounded">
                email
              </span>
              <input
                className="form-input"
                placeholder="E-mail"
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
            <button disabled={isLoading}>Register</button>
          </form>
          <div className="login-card-footer">
            Already have an account?{" "}
            <Link className="register-link" to="/login">
              Click here to login!
            </Link>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
