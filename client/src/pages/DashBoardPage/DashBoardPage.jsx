import React, { useEffect, useState, useMemo } from "react";
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
import { fetchActivitiesApi } from "../../services/activityService";
import { fetchGoalsApi } from "../../services/goalService";
import {
  ProfileInfo,
  ActivityForm,
  ActivitiesCards,
  GoalsCard,
  GoalForm,
} from "../../component/Dashboard/index";

function DashBoardPage() {
  const { currentUser, token } = useAuth();
  const { activities, setActivities, loading, setLoading } = useActivities();
  const { goals, setGoals, loadingGoals, setLoadingGoals } = useGoal();

  const [activityForm, setActivityForm] = useState(false);
  const [goalForm, setGoalForm] = useState(false);
  const [status, setStatus] = useState(null); // for goals status
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchActivitiesApi(currentUser._id, token);
      if (response) {
        setActivities(response);
      }
    } catch (error) {
      setError("Failed to fetch activities.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGoals = async () => {
    setLoadingGoals(true);
    try {
      const response = await fetchGoalsApi(currentUser._id, token);

      if (response) {
        setGoals(response);
        setLoadingGoals(false);
      }
    } catch (error) {
      console.error("Error fetching goals data:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchActivities();
      fetchGoals();
    }
    return () => {
      setLoading(false);
    };
  }, [currentUser]);

  // Total cards
  const totalDuration = useMemo(
    () => activities.reduce((acc, activity) => acc + activity.duration, 0),
    [activities]
  );
  const totalEnergyBurn = useMemo(
    () => activities.reduce((acc, activity) => acc + activity.energyBurn, 0),
    [activities]
  );
  const totalDistance = useMemo(
    () => activities.reduce((acc, activity) => acc + activity.distance, 0),
    [activities]
  );
  const totalGoals = goals.filter((goal) => goal.status === "success");

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
                      {totalGoals.length}
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
              <Card.Body className="d-flex justify-content-center gap-3 flex-column ">
                <Button className="activity-btn" onClick={handleAcShow}>
                  Create Activity
                </Button>
                <div className="overflow-scroll" style={{ height: "500px" }}>
                  {/* activities added */}
                  {loading ? <h1 className="text-center">Loading...</h1> : null}
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
                </div>
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
                {loadingGoals ? (
                  <h1 className="text-center">Loading...</h1>
                ) : null}
                <div className="overflow-scroll" style={{ height: "500px" }}>
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
                </div>
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
