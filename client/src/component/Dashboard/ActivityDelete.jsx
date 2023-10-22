import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import { useAuth } from "../../contexts/AuthContext";
import { useActivities } from "../../contexts/ActivityContext";

const ActivityDelete = ({ deleteShow, handleDeleteClose }) => {
  const { token } = useAuth();
  const { selectedActivity } = useActivities();
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}activities/${selectedActivity.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
