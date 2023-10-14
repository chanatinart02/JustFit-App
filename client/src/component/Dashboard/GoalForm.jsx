import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import activitiesType from "../../constants/activitiesType";

function GoalForm({ goalForm, handleGoalClose }) {
  return (
    <Modal
      show={goalForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        onClick={handleGoalClose}
        style={{ backgroundColor: "#8a2be2", color: "white" }}
      >
        <Modal.Title id="contained-modal-title-vcenter">Set Goal</Modal.Title>
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

          <h5>Your challenge</h5>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Energy burn (Calories)</Form.Label>
              <Form.Control
                type="number"
                name="cal"
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
            <Form.Group as={Col} className="mb-3" controlId="duration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                name="distance"
                onChange=""
                value=""
              />
            </Form.Group>
          </Row>
          <Modal.Footer>
            <Button type="submit" className="edit-btn-color">
              Create
            </Button>

            <Button
              onClick={handleGoalClose}
              style={{ backgroundColor: "#FF4878", border: "none" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default GoalForm;
