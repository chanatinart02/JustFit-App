import React from "react";
import Layout from "../../component/Layout";
import Helmet from "react-helmet";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./LoginPage.css";
import { auth } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";

function LoginPage() {
  const { setCurrentUser, setToken, refreshIdToken } = useAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Get the user information
      const user = userCredential.user;

      // Prepare user data for DB
      const userData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        uid: user.uid,
      };

      const token = await user.getIdToken();

      // Send user data to the server
      await postUserData(userData, token);
      setToken(token);

      // After a successful login, trigger a token refresh
      await refreshIdToken();

      setError("");
      navigate("/dashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setError("E-mail or Password Invalid");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = await GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const token = await user.getIdToken();

      const userData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        uid: user.uid,
      };
      // console.log(userData);
      await postUserData(userData, token);
      setToken(token);

      await refreshIdToken();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  // Function to post user data to the server
  const postUserData = async (userData, idToken) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      // Store current user data in context
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Error posting user data:", error);
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
            onClick={handleLogin}
          >
            Log in
          </button>
          {/* google */}
          <button
            type="button"
            className="login-with-google-btn m-auto "
            onClick={handleGoogleAuth}
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
