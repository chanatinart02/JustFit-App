import React from "react";
import { Modal, Button } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import { deleteGoalApi, fetchGoalsApi } from "../../services/goalService";
import { useGoal } from "../../contexts/GoalContext";

function GoalDelete({ deleteShow, handleDeleteClose, id }) {
  const { currentUser, token } = useAuth();
  const { setGoals } = useGoal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteGoalApi(id, token);

    const updatedGoals = await fetchGoalsApi(currentUser._id, token);

    if (updatedGoals) {
      setGoals(updatedGoals);
    }
    handleDeleteClose();
  };

  return (
    <Modal show={deleteShow} onHide={handleDeleteClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Goal Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this goal card?{" "}
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
}

export default GoalDelete;
