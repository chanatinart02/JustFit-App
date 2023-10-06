import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { content1, content2, user } from "./assets/index.js";
// components
import Layout from "./component/Layout";
import ImageSlider from "./component/Carousel/Carousel";
import SignUpBtn from "./component/SingUpBtn/SignUpBtn";

function App() {
  return (
    <Layout>
      <div className="home">
        <ImageSlider />
        <div className="px-4 py-5 text-center bgw">
          <h1 className="display-5 fw-bold text-body-emphasis">
            Crush your activities goals <br /> with JustFit.
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Stay motivated and on track with our powerful exercise tracker and
              access to helpful health content.
            </p>
            <div className=" d-sm-flex justify-content-sm-center">
              <SignUpBtn variant="secondary" />
            </div>
          </div>
        </div>

        {/* hero2 */}
        <div className="container col-xxl-8 px-4 py-5 hero">
          <div className="row flex-row-reverse align-items-center g-5 justify-content-center ">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src={content1}
                className="d-block mx-lg-auto img-fluid rounded"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3 text-center">
                Personalized goal tracking.
              </h1>
              <p className="lead">
                JustFit allows you to set customized fitness goals and track
                your progress towards them. This ensures that you stay motivated
                and focused on achieving your goals.
              </p>
            </div>
          </div>
          <div className="row flex-lg-row-reverse align-items-center g-5 mt-1 justify-content-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3 text-center">
                Track your exercise progress.
              </h1>
              <p className="lead">
                JustFit allows you to easily track your workouts and monitor
                your progress towards your fitness goals. You can view your data
                in easy-to-read graphs and charts, making it easier to make
                informed decisions about your fitness routine.
              </p>
            </div>
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src={content2}
                className="d-block mx-lg-auto img-fluid rounded"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* review */}
        <div className="px-4 py-5 bgp review">
          <h1 className="display-5 fw-bold px-lg-2 text-center">
            “I've been using JustFit for a month and <br /> have already
            achieved my fitness goals.
            <br /> Highly recommend!”
          </h1>
          <div className="review-info mb-4">
            <span>
              <img src={user} alt="User" />
            </span>
            <h3>Teresa Dunne</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
