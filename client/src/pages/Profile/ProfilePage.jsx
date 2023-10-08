import React, { useState } from "react";
import { Container, Image, Button } from "react-bootstrap";

import Layout from "../../component/Layout";

import "./ProfilePage.css";
import EditProfile from "../../component/EditProfile/EditProfile";

const ProfilePage = () => {
  const [modalShow, setModalShow] = useState(false);

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
            src="https://img.freepik.com/premium-vector/man-is-showing-gesture-okay-ok-cartoon-style_165429-877.jpg?w=2000"
            roundedCircle
            fluid
            width="180px"
            height="180px"
          />
          <div className="user-info mt-4">
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Name</p>
              <p class="fw-semibold">Fullname</p>
            </div>
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Gender</p>
              <p class="fw-semibold">Woman</p>
            </div>
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Age</p>
              <p class="fw-semibold">23</p>
            </div>
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Height</p>
              <p class="fw-semibold">167</p>
            </div>
            <div class="col-sm-3 d-flex gap-3">
              <p class="info">Weight</p>
              <p class="fw-semibold">47</p>
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
