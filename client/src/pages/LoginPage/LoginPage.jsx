import React from "react";
import Layout from "../../component/Layout";
import Helmet from "react-helmet";
import "./LoginPage.css";

function LoginPage() {
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

        <form className="mx-4">
          <div className="form-floating mb-4 w-100">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-4 w-100">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label className="me-5">
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button className="w-100 btn btn-lg login-btn mb-4" type="submit">
            Log in
          </button>
          {/* google */}
          <button type="button" class="login-with-google-btn m-auto ">
            Continue with Google
          </button>
        </form>
        <p className="text-center mt-4">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </main>
    </Layout>
  );
}

export default LoginPage;
