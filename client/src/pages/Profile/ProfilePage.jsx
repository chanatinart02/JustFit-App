import React, { useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import axios from "axios";

import Layout from "../../component/Layout";
import "./ProfilePage.css";
import EditProfile from "../../component/EditProfile/EditProfile";
import { user2 } from "../../assets";
import { useAuth } from "../../contexts/AuthContext";

const ProfilePage = () => {
  const { currentUser, token, setCurrentUser } = useAuth();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}users/${currentUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [currentUser, token]);

  const handleEditModal = () => {
    setModalShow(true);
  };
  const closeModal = () => {
    setModalShow(false);
  };
  return (
    <Layout>
      <Container fluid>
        <h2 className="text-center mt-4">My Profile</h2>
        <section className="d-flex flex-column align-items-center">
          <h4>Current Photo</h4>
          <Image
            src={currentUser?.avatar || user2}
            roundedCircle
            fluid
            width="180px"
            height="180px"
          />
          <div className="user-info mt-4">
            <div className="col-sm-3 d-flex gap-3">
              <p className="info">Name</p>
              <p className="fw-semibold">{currentUser?.name || "Anonymous"}</p>
            </div>
            <div className="col-sm-3 d-flex gap-3">
              <p className="info">Gender</p>
              <p className="fw-semibold">{currentUser?.gender || "N/A"}</p>
            </div>
            <div className="col-sm-3 d-flex gap-3">
              <p className="info">Age</p>
              <p className="fw-semibold">{currentUser?.age || "N/A"}</p>
            </div>
            <div className="col-sm-3 d-flex gap-3">
              <p className="info">Height</p>
              <p className="fw-semibold">{currentUser?.height || "N/A"}</p>
            </div>
            <div className="col-sm-3 d-flex gap-3">
              <p className="info">Weight</p>
              <p className="fw-semibold">{currentUser?.weight || "N/A"}</p>
            </div>
          </div>
          <Button
            size="lg"
            className="edit-btn-color edit-width"
            onClick={handleEditModal}
          >
            Edit profile
          </Button>
        </section>
        <EditProfile modalShow={modalShow} closeModal={closeModal} />
      </Container>
    </Layout>
  );
};

export default ProfilePage;
