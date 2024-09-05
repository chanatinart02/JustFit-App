import React from "react";
import Layout from "../../component/Layout";
import Helmet from "react-helmet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

import { handleLogin, handleGoogleAuth } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

function LoginPage() {
  const { setCurrentUser, setToken, refreshIdToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle login with email and password
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      const { res, token } = await handleLogin(email, password);
      setToken(token);
      await refreshIdToken();
      setCurrentUser(res);
      setError("");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.code, error.message);
      setError("E-mail or Password Invalid");
    }
  };

  // Function to handle login with Google
  const handleGoogleSignIn = async () => {
    try {
      const { res, token } = await handleGoogleAuth();
      setToken(token);
      await refreshIdToken();
      setCurrentUser(res);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <Layout>
      <Helmet>
        <style type="text/css">
          {`
      body {
        background-image: url(https://cdn.pixabay.com/photo/2016/12/25/22/49/workout-1931107_1280.jpg);
        background-size: cover;
        background-position: center center;
      }
    `}
        </style>
      </Helmet>
      <main className="form_container m-auto mt-4 ">
        <h1 className="h1 mb-3 text-center log-in">Log in</h1>
        <h1 className="h3 mb-3 fw-bold text-center">Welcome back</h1>

        <form className="mx-4 form">
          <div className="form-floating mb-4 w-100">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-4 w-100">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label className="me-5">
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          {/* Display error */}
          {error && <div className="alert alert-danger">{error}</div>}

          <button
            className="w-100 btn btn-lg login-btn mb-4"
            type="submit"
            onClick={handleEmailLogin}
          >
            Log in
          </button>
          {/* google */}
          <button
            type="button"
            className="login-with-google-btn m-auto "
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </button>
        </form>
        <p className="text-center mt-4">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </main>
    </Layout>
  );
}

export default LoginPage;
