import React from "react";
import { Container, Card, Image } from "react-bootstrap";

import { user2 } from "../../assets";
import { useAuth } from "../../contexts/AuthContext";

const ProfileInfo = () => {
  const { currentUser } = useAuth();

  return (
    <Container>
      <Card className="profile-card">
        <Card.Body className="text-center">
          <Image
            src={currentUser?.avatar || user2}
            roundedCircle
            fluid="true"
            style={{ width: "180px", height: "180px" }}
          />
          <Card.Title className="m-3 fw-bold">
            {currentUser?.name || "Anonymous"}
          </Card.Title>
          <div className="d-flex justify-content-evenly">
            <div className="info-desc">
              <p className="fw-bold mb-2">Height</p>
              <p className="card-info">{currentUser?.height || "N/A"}</p>
            </div>
            <div className="info-desc">
              <p className="fw-bold mb-2">Weight</p>
              <p className="card-info">{currentUser?.weight || "N/A"}</p>
            </div>
            <div className="info-desc">
              <p className="fw-bold mb-2">Age</p>
              <p className="card-info">{currentUser?.age || "N/A"}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileInfo;
