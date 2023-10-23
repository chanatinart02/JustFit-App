import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { BiTimeFive } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";
import axios from "axios";

import Layout from "../../component/Layout";
import { burn, award } from "../../assets";
import "./Dashboard.css";
import { useAuth } from "../../contexts/AuthContext";
import { useActivities } from "../../contexts/ActivityContext";
import { useGoal } from "../../contexts/GoalContext";

import {
  convertToHoursAndMinutes,
  metersToKilometers,
} from "../../Utils/activityUtils";
import {
  ProfileInfo,
  ActivityForm,
  ActivitiesCards,
  GoalsCard,
  GoalForm,
} from "../../component/Dashboard/index";

function DashBoardPage() {
  const { currentUser, token } = useAuth();
  const { activities, setActivities } = useActivities();
  const { goals, setGoals } = useGoal();

  const [activityForm, setActivityForm] = useState(false);
  const [goalForm, setGoalForm] = useState(false);
  const [status, setStatus] = useState(null); // for goals status

  const fetchActivities = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}activities/${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setActivities(res.data);
    } catch (error) {
      console.error("Error fetching activities data:", error);
    }
  };

  const fetchGoals = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}goals/${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGoals(res.data);
    } catch (error) {
      console.error("Error fetching goals data:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchGoals();
  }, [activities, goals]);

  const totalDuration = activities.reduce(
    (acc, activity) => acc + activity.duration,
    0
  );
  const totalEnergyBurn = activities.reduce(
    (acc, activity) => acc + activity.energyBurn,
    0
  );
  const totalDistance = activities.reduce(
    (acc, activity) => acc + activity.distance,
    0
  );

  const formattedDuration = convertToHoursAndMinutes(totalDuration);
  const formattedDistance = metersToKilometers(totalDistance);

  const handleAcClose = () => setActivityForm(false);
  const handleAcShow = () => setActivityForm(true);
  const handleGoalClose = () => setGoalForm(false);
  const handleGoalShow = () => setGoalForm(true);

  return (
    <Layout>
      <Container>
        <h2 className="mt-2 mb-0">Hello, {currentUser.name || "Anonymous"}</h2>
        <p className="fs-5">Keep Moving & Stay Healty</p>
        <Row className="total-profile">
          <Col className="total">
            <Container>
              <Row className="text-center d-flex justify-content-center flex-wrap ">
                <Card style={{ width: "200px", margin: "20px" }}>
                  <Card.Body className="text-center">
                    <BiTimeFive
                      style={{
                        width: "58px",
                        height: "60px",
                        color: "white",
                        marginBottom: "5px",
                      }}
                    />
                    <Card.Title className=" text-light">Duration</Card.Title>

                    <Card.Text style={{ fontSize: "24px", color: "white" }}>
                      {formattedDuration}
                    </Card.Text>
                  </Card.Body>
                </Card>
                {/*  */}
                <Card style={{ width: "200px", margin: "20px" }}>
                  <Card.Body className="text-center">
                    <Image
                      src={burn}
                      style={{
                        width: "64px",
                        height: "64px",
                        marginBottom: "5px",
                      }}
                    />
                    <Card.Title className=" text-light">Energy burn</Card.Title>
                    <Card.Text style={{ fontSize: "24px", color: "white" }}>
                      {totalEnergyBurn} Cal
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card style={{ width: "200px", margin: "20px" }}>
                  <Card.Body className="text-center">
                    <GiPathDistance
                      style={{
                        width: "58px",
                        height: "60px",
                        color: "white",
                        marginBottom: "5px",
                      }}
                    />
                    <Card.Title className=" text-light">Distance</Card.Title>
                    <Card.Text style={{ fontSize: "24px", color: "white" }}>
                      {formattedDistance} Km.
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card style={{ width: "200px", margin: "20px" }}>
                  <Card.Body className="text-center">
                    <Image
                      src={award}
                      style={{
                        width: "64px",
                        height: "64px",
                        marginBottom: "5px",
                      }}
                    />
                    <Card.Title className=" text-light">Goal</Card.Title>
                    <Card.Text style={{ fontSize: "24px", color: "white" }}>
                      3
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
            </Container>
          </Col>
          <Col className="profile-info">
            <ProfileInfo />
          </Col>
        </Row>

        {/* Chart */}
        <Row fluid>
          <Col>Chart</Col>
        </Row>

        {/* Activity */}
        <h5 className="mt-2 mb-0 justify-content-md-center">
          Activities Tracking
        </h5>
        <Row className="justify-content-md-center">
          <Col xs lg="7" className="activity">
            <Card className="profile-card">
              <Card.Header className="activity-header h5 p-3">
                Activities Tracking
              </Card.Header>
              <Card.Body className="d-flex justify-content-center gap-3 flex-column">
                <Button className="activity-btn" onClick={handleAcShow}>
                  Create Activity
                </Button>

                {/* activities added */}
                {activities.map((activity) => (
                  <ActivitiesCards
                    key={activity._id}
                    id={activity._id}
                    typeOfActivity={activity.typeOfActivity}
                    title={activity.title}
                    dateOfActivity={activity.dateOfActivity}
                    duration={activity.duration}
                    energyBurn={activity.energyBurn}
                    distance={activity.distance}
                    description={activity.description}
                  />
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Goals */}
          <Col className="goals">
            <Card className="profile-card">
              <Card.Header className="activity-header h5 p-3">
                Your Goals
              </Card.Header>
              <Card.Body className="d-flex justify-content-center gap-3 flex-column">
                <Button className="activity-btn" onClick={handleGoalShow}>
                  New Goal
                </Button>

                {/* Goals added */}
                {goals.map((goal) => (
                  <GoalsCard
                    key={goal._id}
                    id={goal._id}
                    typeOfGoal={goal.typeOfGoal}
                    deadline={goal.deadline}
                    duration={goal.duration}
                    energyBurn={goal.energyBurn}
                    distance={goal.distance}
                    status={goal.status}
                    setStatus={setStatus}
                  />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Modals */}
        <ActivityForm
          activityForm={activityForm}
          handleAcClose={handleAcClose}
        />
        <GoalForm goalForm={goalForm} handleGoalClose={handleGoalClose} />
      </Container>
    </Layout>
  );
}

export default DashBoardPage;
