import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import axios from "axios";

import activitiesType from "../../constants/activitiesType";

const ActivityForm = ({ activityForm, handleAcClose }) => {
  const [value, onChange] = useState(new Date()); // time picker
  return (
    <Modal
      show={activityForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        onClick={handleAcClose}
        style={{ backgroundColor: "#8a2be2", color: "white" }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Create Activity
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
              <TimeRangePicker
                className="time-range"
                onChange={onChange}
                value={value}
              />
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
              Create
            </Button>

            <Button
              onClick={handleAcClose}
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

export default ActivityForm;
