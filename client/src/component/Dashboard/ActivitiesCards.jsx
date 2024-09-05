import React, { useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import dayjs from "dayjs";

import { bin } from "../../assets";
import EditActivity from "./EditActivity";
import ActivityDelete from "./ActivityDelete";
import {
  convertToHoursAndMinutes,
  metersToKilometers,
} from "../../Utils/activityUtils";
import activitiesType from "../../constants/activitiesType";
import { useActivities } from "../../contexts/ActivityContext";

const ActivitiesCards = ({
  id,
  typeOfActivity,
  title,
  dateOfActivity,
  duration,
  energyBurn,
  distance,
  description,
}) => {
  const { setSelectedActivity } = useActivities();
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const formattedDate = dayjs(dateOfActivity).format("DD/MM/YYYY");
  const formattedDuration = convertToHoursAndMinutes(duration);

  const activity = activitiesType.find(
    (activity) => activity.name === typeOfActivity
  );
  const formattedDistance = metersToKilometers(distance);

  const handleEditShow = () => {
    setEditShow(true);
    setSelectedActivity({
      id,
      typeOfActivity,
      title,
      dateOfActivity,
      duration,
      energyBurn,
      distance,
      description,
    });
  };
  const handleEditClose = () => setEditShow(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => {
    setDeleteShow(true);
    setSelectedActivity({ id });
  };
  return (
    <>
      <Card className="mt-4">
        <Card.Body className="d-flex gap-3 text-light">
          <Image
            src={activity.imageUrl}
            roundedCircle
            fluid="true"
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: "white",
            }}
          />
          <div className="activity-content">
            <p className="fs-5 mb-0">{formattedDate}</p>
            <p className="fs-5 mb-0">{title}</p>
            <p className="fs-5 mb-0">Duration : {formattedDuration}</p>
            <p className="fs-5 mb-0">Distance : {formattedDistance} km</p>
            <p className="fs-5 mb-0">Energy burn : {energyBurn} Cal</p>
            <p className="fs-5 mb-0">{description}</p>
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
