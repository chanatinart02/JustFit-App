import React from "react";
import Layout from "../../component/Layout";
import Helmet from "react-helmet";

function SignUpPage() {
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
          Join JustFit today,
          <br />
          It’s free
        </h1>
        <h1 className="h3 mb-3 fw-bold text-center">Welcome to JustFit!</h1>

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
            Sign up
          </button>
          {/* google */}
          <button type="button" className="login-with-google-btn m-auto ">
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
