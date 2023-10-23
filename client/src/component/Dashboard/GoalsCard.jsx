import React, { useState } from "react";
import { Card, Image, Button } from "react-bootstrap";

import { bin, jogging, success, fail } from "../../assets";
import GoalDelete from "./GoalDelete";

function GoalsCard() {
  const [deleteShow, setDeleteShow] = useState(false);
  const [status, setStatus] = useState(null);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);
  return (
    <>
      <Card>
        <Card.Body className="d-flex text-light justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <Image
              src={jogging}
              roundedCircle
              fluid
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: "white",
              }}
            />
            <p style={{ fontSize: "14px" }}>End in 6 day</p>
          </div>

          <div className="goal-content">
            <h6>Start 14/03/2023</h6>
            <p className="fs-6 mb-0">Duration : 01:00 hrs</p>
            <p className="fs-6 mb-0">Distance : 10 km</p>
            <p className="fs-6 mb-0">Energy burn : ?? Cal</p>
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
                <Button variant="success" onClick={() => setStatus("success")}>
                  Success
                </Button>
                <Button variant="danger" onClick={() => setStatus("failed")}>
                  Failure
                </Button>
              </>
            )}
            {status === "success" && (
              <Image
                src={success}
                roundedCircle
                fluid
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
                fluid
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
      />
    </>
  );
}

export default GoalsCard;
