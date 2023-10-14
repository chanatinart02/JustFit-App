import React, { useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import axios from "axios";

import Layout from "../../component/Layout";
import "./ProfilePage.css";
import EditProfile from "../../component/EditProfile/EditProfile";
import { user2 } from "../../assets";

const ProfilePage = () => {
  const [modalShow, setModalShow] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); //get user
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
  }); // Initialize userData state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}users/${currentUser._id}`
        );
        setUserData(res.data);
        localStorage.setItem("currentUser", JSON.stringify(res.data)); // update user in LocalStorage
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [currentUser]);

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
            src={userData?.avatar || user2}
            roundedCircle
            fluid
            width="180px"
            height="180px"
          />
          <div className="user-info mt-4">
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Name</p>
              <p class="fw-semibold">{userData?.name || "Anonymous"}</p>
            </div>
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Gender</p>
              <p class="fw-semibold">{userData?.gender || "N/A"}</p>
            </div>
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Age</p>
              <p class="fw-semibold">{userData?.age || "N/A"}</p>
            </div>
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Height</p>
              <p class="fw-semibold">{userData?.height || "N/A"}</p>
            </div>
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Weight</p>
              <p class="fw-semibold">{userData?.weight || "N/A"}</p>
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
        <EditProfile
          modalShow={modalShow}
          closeModal={closeModal}
          userData={userData}
        />
      </Container>
    </Layout>
  );
};

export default ProfilePage;
