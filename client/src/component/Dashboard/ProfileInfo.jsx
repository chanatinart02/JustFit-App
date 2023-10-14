import React, { useEffect, useState } from "react";
import { Container, Card, Image } from "react-bootstrap";
import axios from "axios";

import { user2 } from "../../assets";

const ProfileInfo = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); //get user
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    height: 0,
    weight: 0,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}users/${currentUser._id}`
        );
        setUserData(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [currentUser]);
  return (
    <Container>
      <Card className="profile-card">
        <Card.Body className="text-center">
          <Image
            src={userData?.avatar || user2}
            roundedCircle
            fluid
            style={{ width: "180px", height: "180px" }}
          />
          <Card.Title className="m-3 fw-bold">
            {userData?.name || "Anonymous"}
          </Card.Title>
          <div className="d-flex justify-content-evenly">
            <div className="info-desc">
              <p className="fw-bold mb-2">Height</p>
              <p className="card-info">{userData?.height || "N/A"}</p>
            </div>
            <div className="info-desc">
              <p className="fw-bold mb-2">Weight</p>
              <p className="card-info">{userData?.weight || "N/A"}</p>
            </div>
            <div className="info-desc">
              <p className="fw-bold mb-2">Age</p>
              <p className="card-info">{userData?.age || "N/A"}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileInfo;
