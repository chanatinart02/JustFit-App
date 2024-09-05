import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import activitiesType from "../../constants/activitiesType";
import { useActivities } from "../../contexts/ActivityContext";
import { useAuth } from "../../contexts/AuthContext";
import { calculateTime, calculateEnergyBurn } from "../../Utils/activityUtils";
import {
  updateActivity,
  fetchActivitiesApi,
} from "../../services/activityService";

const EditActivity = ({ editShow, handleEditClose }) => {
  const { selectedActivity, setActivities } = useActivities();
  const { currentUser, token } = useAuth();

  const [formData, setFormData] = useState({
    typeOfActivity: "",
    title: "",
    dateOfActivity: "",
    duration: 0,
    energyBurn: 0,
    distance: 0,
    description: "",
  });
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    if (selectedActivity) {
      setFormData(selectedActivity);
      setHour(Math.floor(selectedActivity.duration / 60));
      setMinute(selectedActivity.duration % 60);
    }
  }, [selectedActivity]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "hour") {
      setHour(value);
    } else if (name === "minute") {
      setMinute(value);
    }

    const newHour = name === "hour" ? value : hour;
    const newMinute = name === "minute" ? value : minute;

    const duration = calculateTime(newHour, newMinute);
    const energyBurn = calculateEnergyBurn(formData.typeOfActivity, duration);

    setFormData((prevData) => ({
      ...prevData,
      duration,
      energyBurn,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateActivity(selectedActivity.id, formData, token);

      const updatedActivities = await fetchActivitiesApi(
        currentUser._id,
        token
      );

      if (updatedActivities) {
        setActivities(updatedActivities); // Update the context state
        handleEditClose();
      }
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Choose Activity</Form.Label>
            <Form.Select
              aria-label="typeOfActivity"
              name="typeOfActivity"
              value={formData.typeOfActivity}
              onChange={handleChange}
            >
              <option>select your activity</option>
              {activitiesType.map((activity) => (
                <option key={activity.name} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupTitle">
            <Form.Label>Habit Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
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
                onChange={handleChange}
                value={formData.dateOfActivity}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3 d-flex flex-column">
              <Form.Label>Time</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  min="0"
                  max="10000"
                  placeholder="Hour"
                  className="mr-2"
                  value={hour}
                  onChange={handleChange}
                  name="hour"
                />
                <Form.Control
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Minute"
                  value={minute}
                  onChange={handleChange}
                  name="minute"
                />
              </div>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Energy burn (Calories)</Form.Label>
              <Form.Control
                type="number"
                name="energyBurn"
                disabled
                value={formData.energyBurn}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Distance (meter)</Form.Label>
              <Form.Control
                type="number"
                name="distance"
                onChange={handleChange}
                value={formData.distance}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="describe your activity"
              name="description"
              onChange={handleChange}
              value={formData.description}
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
