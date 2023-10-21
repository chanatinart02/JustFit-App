import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

import activities from "../../constants/activitiesType";
import { useAuth } from "../../contexts/AuthContext";

const ActivityForm = ({ activityForm, handleAcClose }) => {
  const { currentUser, token, setCurrentUser } = useAuth();
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

  const handleChange = (e) => {
    // Destructuring the event object to get the name and value
    const { name, value } = e.target;

    if (name === "hour") {
      setHour(value);
    } else if (name === "minute") {
      setMinute(value);
    }
    // Get the new hour and minute values
    const newHour = name === "hour" ? value : hour;
    const newMinute = name === "minute" ? value : minute;

    const duration = calculateTime(newHour, newMinute);
    const energyBurn = calculateEnergyBurn(formData.typeOfActivity, duration);

    // Calculate the duration based on the updated hour and minute
    setFormData((prevData) => ({
      ...prevData,
      duration,
      energyBurn,
      [name]: value,
    }));
  };

  function calculateTime(hour, minute) {
    let totalMinutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);
    return totalMinutes;
  }

  const calculateEnergyBurn = (activityType, duration) => {
    const selectedActivity = activities.find(
      (activity) => activity.name === activityType
    );
    if (selectedActivity) {
      const caloriesPerMinute = selectedActivity.caloriesPerMinute;
      const totalCaloriesBurned = caloriesPerMinute * duration;
      return totalCaloriesBurned;
    } else {
      return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormData({
        ...formData,
      });

      // Send form data to server
      // await axios.post("/api/activities", updatedFormData);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}activities/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setFormData({
        typeOfActivity: "",
        title: "",
        dateOfActivity: "",
        duration: 0,
        energyBurn: 0,
        distance: 0,
        description: "",
      });
      setHour(null);
      setMinute(null);
      handleAcClose();
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

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
        style={{
          backgroundColor: "#8a2be2",
          color: "white",
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Create Activity
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
              required
            >
              <option>select your activity</option>
              {activities.map((activity) => (
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
              required
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
                style={{
                  height: "38px",
                }}
                onChange={handleChange}
                value={formData.dateOfActivity}
                required
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
              Create
            </Button>

            <Button
              onClick={handleAcClose}
              style={{
                backgroundColor: "#FF4878",
                border: "none",
              }}
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
