import React, { useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";

import { bin, jogging } from "../../assets";
import EditActivity from "./EditActivity";
import ActivityDelete from "./ActivityDelete";

const ActivitiesCards = () => {
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);
  return (
    <>
      <Card>
        <Card.Body className="d-flex gap-3 text-light">
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
          <div className="activity-content">
            <h6>14/03/2023 10:00 AM</h6>
            <h6>Running with friend</h6>
            <p className="fs-6 mb-0">Duration : 01:00 hrs</p>
            <p className="fs-6 mb-0">Distance : 10 km</p>
            <p className="fs-6 mb-0">Energy burn : ?? Cal</p>
            <p className="fs-6 mb-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley
            </p>
          </div>
          <div className="edit-delete d-flex gap-3">
            <BiEdit
              className="edit-btn"
              style={{ fontSize: "36px", color: "white" }}
              onClick={handleEditShow}
            />
            <Image
              src={bin}
              className="delete"
              style={{ width: "36px", height: "36px" }}
              onClick={handleDeleteShow}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Modals */}
      <EditActivity editShow={editShow} handleEditClose={handleEditClose} />
      <ActivityDelete
        deleteShow={deleteShow}
        handleDeleteClose={handleDeleteClose}
      />
    </>
  );
};

export default ActivitiesCards;
