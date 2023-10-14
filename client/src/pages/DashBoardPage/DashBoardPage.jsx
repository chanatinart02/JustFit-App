import React, { useState } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { BiTimeFive, BiEdit } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";

import Layout from "../../component/Layout";
import { burn, award, bin, jogging } from "../../assets";
import "./Dashboard.css";

import {
  ProfileInfo,
  ActivityForm,
  ActivitiesCards,
  GoalsCard,
  GoalForm,
} from "../../component/Dashboard/index";

function DashBoardPage() {
  const [activityForm, setActivityForm] = useState(false);
  const [goalForm, setGoalForm] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleAcClose = () => setActivityForm(false);
  const handleAcShow = () => setActivityForm(true);
  const handleGoalClose = () => setGoalForm(false);
  const handleGoalShow = () => setGoalForm(true);

  return (
    <Layout>
      <Container>
        <h2 className="mt-2 mb-0">Hello, {currentUser.name}</h2>
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
                      1.30 Hours
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
                      500 Cal
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
                      8.37 Km.
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
                <ActivitiesCards />
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
                <GoalsCard />
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
