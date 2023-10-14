import React, { useState } from "react";
import { Card, Image, Button } from "react-bootstrap";

import { bin, jogging } from "../../assets";
import GoalDelete from "./GoalDelete";

function GoalsCard() {
  const [deleteShow, setDeleteShow] = useState(false);

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
            <Button variant="success">Success</Button>
            <Button variant="danger">Failure</Button>
          </div>
        </Card.Body>
      </Card>
      // Modal
      <GoalDelete
        deleteShow={deleteShow}
        handleDeleteClose={handleDeleteClose}
      />
    </>
  );
}

export default GoalsCard;
