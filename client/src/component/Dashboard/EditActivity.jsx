import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import axios from "axios";

import activitiesType from "../../constants/activitiesType";

const EditActivity = ({ editShow, handleEditClose }) => {
  return (
    <Modal
      show={editShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        onClick={handleEditClose}
        style={{ backgroundColor: "#8a2be2", color: "white" }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Activity
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit="">
          <Form.Group className="mb-3">
            <Form.Label>Choose Activity</Form.Label>
            <Form.Select
              aria-label="activity"
              name="activity"
              value="{}"
              onChange=""
            >
              <option>select your activity</option>
              {activitiesType.map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupTitle">
            <Form.Label>Habit Title</Form.Label>
            <Form.Control type="text" name="title" onChange="" value="" />
          </Form.Group>

          <Row>
            <Form.Group
              as={Col}
              className="mb-3 d-flex flex-column"
              controlId="dateTime"
            >
              <Form.Label>Date</Form.Label>
              <input
                type="date"
                name="dateOfActivity"
                id="dateOfActivity"
                style={{ height: "38px" }}
                // onChange={handleChange}
                // value={formData.dateOfBirth}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3 d-flex flex-column">
              <Form.Label>Start - End Time</Form.Label>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Energy burn (Calories)</Form.Label>
              <Form.Control
                type="number"
                name="cal"
                disabled
                // onChange={handleChange}
                // value={formData.height || userData.height}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Distance (meter)</Form.Label>
              <Form.Control
                type="number"
                name="distance"
                // onChange={handleChange}
                // value={formData.height || userData.height}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="describe your activity"
            />
          </Form.Group>

          <Modal.Footer>
            <Button type="submit" className="edit-btn-color">
              Edit
            </Button>

            <Button
              onClick={handleEditClose}
              style={{ backgroundColor: "#FF4878", border: "none" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditActivity;
