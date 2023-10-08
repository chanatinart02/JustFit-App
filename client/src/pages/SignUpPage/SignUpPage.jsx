import React, { useState } from "react";
import Layout from "../../component/Layout";
import Helmet from "react-helmet";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { auth } from "../../services/firebase";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);

          const userData = {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            avatar: user.photoURL,
          };

          postUserData(userData);
          setError("");
          navigate("/login");
        }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setError(errorMessage);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = await GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        avatar: user.photoURL,
      };

      await postUserData(userData);
      navigate("/");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const postUserData = async (userData) => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}users`, userData);
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
        background-image: url(https://images.pexels.com/photos/221247/pexels-photo-221247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
        background-size: cover;
        background-position: center center;
      }
    `}
        </style>
      </Helmet>
      <main className="form_container m-auto mt-4 ">
        <h1 className="h1 mb-3 text-center log-in">
          Join Just<span>Fit</span> today,
          <br />
          It’s free
        </h1>
        <h1 className="h3 mb-3 fw-bold text-center">Welcome to JustFit!</h1>

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
            onClick={handleSignUp}
          >
            Sign up
          </button>
          {/* google */}
          <button
            type="button"
            className="login-with-google-btn m-auto"
            onClick={handleGoogleAuth}
          >
            Continue with Google
          </button>
        </form>
        <p className="text-center mt-4">
          Already a member? <a href="/login">Log in</a>
        </p>
      </main>
    </Layout>
  );
}

export default SignUpPage;
