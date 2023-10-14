import React from "react";
import { Modal, Button } from "react-bootstrap";

const ActivityDelete = ({ deleteShow, handleDeleteClose }) => {
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
        <Button variant="danger">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActivityDelete;
