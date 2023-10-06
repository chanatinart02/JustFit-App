import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import { cover1, cover2, cover3 } from "../../assets/index.js";

function ImageSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={cover1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={cover2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={cover3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageSlider;
