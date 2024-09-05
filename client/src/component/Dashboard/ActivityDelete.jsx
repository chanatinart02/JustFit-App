import React from "react";
import { Modal, Button } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import { useActivities } from "../../contexts/ActivityContext";
import {
  deleteActivity,
  fetchActivitiesApi,
} from "../../services/activityService";

const ActivityDelete = ({ deleteShow, handleDeleteClose }) => {
  const { currentUser, token } = useAuth();
  const { selectedActivity, setActivities } = useActivities();
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteActivity(selectedActivity.id, token);

    const updatedActivities = await fetchActivitiesApi(currentUser._id, token);
    if (updatedActivities) {
      setActivities(updatedActivities);
    }
    handleDeleteClose();
  };

  return (
    <Modal show={deleteShow} onHide={handleDeleteClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Activity Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this activity card?{" "}
        <span className="text-danger fw-bold">
          This action cannot be undone.
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActivityDelete;
