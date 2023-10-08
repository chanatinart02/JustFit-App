import React from "react";
import { Modal, Button, Container, Form, Row, Col } from "react-bootstrap";

import genderTypes from "../../constants/genderType";

const EditProfile = ({ closeModal, modalShow }) => {
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
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="gender">
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
              name="bday"
              id="bday"
              style={{ height: "38px" }}
            />
          </Form.Group>

          <Form.Label>Height</Form.Label>
          <Form.Control type="number" />

          <Form.Label>Weight</Form.Label>
          <Form.Control type="number" />

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile photo</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" className="edit-btn-color">
          Save
        </Button>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfile;
