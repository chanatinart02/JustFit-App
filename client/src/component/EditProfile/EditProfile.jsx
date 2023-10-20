import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

import genderTypes from "../../constants/genderType";
import { useAuth } from "../../contexts/AuthContext";

const EditProfile = ({ closeModal, modalShow }) => {
  const { currentUser, token, setCurrentUser } = useAuth();
  // const [avatar, setAvatar] = useState({ name: "", url: "" });
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      const age = calculateAge(value);
      setFormData({
        ...formData,
        age: age,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}users/${currentUser._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentUser(res.data);
      closeModal();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={closeModal}>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            {currentUser && (
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name || currentUser.name}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="gender"
              name="gender"
              value={formData.gender || currentUser.gender}
              onChange={handleChange}
            >
              <option>select your gender</option>
              {genderTypes.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="mb-3 d-flex flex-column"
            controlId="formBasicPassword"
          >
            <Form.Label>Date of birth</Form.Label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              style={{ height: "38px" }}
              onChange={handleChange}
              value={formData.dateOfBirth || currentUser.age}
            />
          </Form.Group>

          <Form.Label>Height</Form.Label>
          <Form.Control
            type="number"
            name="height"
            placeholder="167 cm"
            onChange={handleChange}
            value={formData.height || currentUser.height}
          />

          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            placeholder="47 kg"
            onChange={handleChange}
            value={formData.weight || currentUser.weight}
          />

          {/* <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile photo</Form.Label>
            <Form.Control accept="image/*" type="file" name="avatar" />
          </Form.Group> */}

          <Modal.Footer>
            <Button type="submit" className="edit-btn-color">
              Save
            </Button>

            <Button onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfile;
