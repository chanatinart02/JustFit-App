import React, { useState, useCallback } from "react";
import { Card, Image, Button } from "react-bootstrap";
import dayjs from "dayjs";

import { bin, success, fail } from "../../assets";
import GoalDelete from "./GoalDelete";
import activitiesType from "../../constants/activitiesType";
import { useAuth } from "../../contexts/AuthContext";
import { updateGoalStatusApi, fetchGoalsApi } from "../../services/goalService";
import { useGoal } from "../../contexts/GoalContext";
import {
  convertToHoursAndMinutes,
  metersToKilometers,
} from "../../Utils/activityUtils";

function GoalsCard({
  id,
  typeOfGoal,
  deadline,
  duration,
  energyBurn,
  distance,
  status,
  setStatus,
}) {
  const { token, currentUser } = useAuth();
  const { setGoals } = useGoal();
  const [deleteShow, setDeleteShow] = useState(false);

  const updateStatus = useCallback(
    async (newStatus) => {
      try {
        await updateGoalStatusApi(id, newStatus, token);
        setStatus(newStatus);

        const updatedGoals = await fetchGoalsApi(currentUser._id, token);
        if (updatedGoals) {
          setGoals(updatedGoals);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to update status. Please try again.");
      }
    },
    [id, token]
  );

  const goal = activitiesType.find((activity) => activity.name === typeOfGoal);
  const formattedDate = dayjs(deadline).format("DD/MM/YYYY");
  const formattedDuration = convertToHoursAndMinutes(duration);
  const formattedDistance = metersToKilometers(distance);
  const differenceInDays = dayjs(deadline).diff(dayjs(), "day");

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);
  return (
    <>
      <Card className="mt-4">
        <Card.Body className="d-flex text-light justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <Image
              src={goal.imageUrl}
              roundedCircle
              fluid="true"
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: "white",
              }}
            />
            <p style={{ fontSize: "14px" }}>
              {differenceInDays > 0
                ? `Ends in ${differenceInDays} day${
                    differenceInDays !== 1 ? "s" : ""
                  }`
                : "Ended"}
            </p>
          </div>

          <div className="goal-content">
            <h6>Finish Date {formattedDate}</h6>
            <p className="fs-6 mb-0">Duration : {formattedDuration}</p>
            <p className="fs-6 mb-0">Distance : {formattedDistance}</p>
            <p className="fs-6 mb-0">Energy burn : {energyBurn} Cal</p>
          </div>
          <div className="goal-complete d-flex flex-column align-items-center gap-3">
            <Image
              src={bin}
              className="delete"
              style={{ width: "36px", height: "36px" }}
              onClick={handleDeleteShow}
            />
            {/* Status Goal */}
            {status === null && (
              <>
                <Button
                  variant="success"
                  onClick={() => updateStatus("success")}
                  aria-label="Mark goal as success"
                >
                  Success
                </Button>
                <Button
                  variant="danger"
                  onClick={() => updateStatus("failed")}
                  aria-label="Mark goal as failed"
                >
                  Failure
                </Button>
              </>
            )}
            {status === "success" && (
              <Image
                src={success}
                roundedCircle
                fluid="true"
                style={{
                  width: "56px",
                  height: "56px",
                }}
              />
            )}
            {status === "failed" && (
              <Image
                src={fail}
                roundedCircle
                fluid="true"
                style={{
                  width: "56px",
                  height: "56px",
                }}
              />
            )}
          </div>
        </Card.Body>
      </Card>

      <GoalDelete
        deleteShow={deleteShow}
        handleDeleteClose={handleDeleteClose}
        id={id}
      />
    </>
  );
}

export default GoalsCard;
