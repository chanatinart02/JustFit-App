import React from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { BiTimeFive } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";

import Layout from "../../component/Layout";
import { burn, award } from "../../assets";
import "./Dashboard.css";

function DashBoardPage() {
  return (
    <Layout>
      <Container>
        <h2 className="mt-2 mb-0">Hello, Karina</h2>
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
            <Container>
              <Card className="profile-card">
                <Card.Body className="text-center">
                  <Image
                    src="https://img.soccersuck.com/images/2022/09/02/302438761_171482575436312_4903874861651494597_n.jpg"
                    roundedCircle
                    fluid
                    style={{ width: "180px", height: "180px" }}
                  />
                  <Card.Title className="m-3 fw-bold">Karina Aespa</Card.Title>
                  <div className="d-flex justify-content-evenly">
                    <div className="info-desc">
                      <p className="fw-bold mb-2">Height</p>
                      <p className="card-info">168 cm</p>
                    </div>
                    <div className="info-desc">
                      <p className="fw-bold mb-2">Weight</p>
                      <p className="card-info">45 kg</p>
                    </div>
                    <div className="info-desc">
                      <p className="fw-bold mb-2">Age</p>
                      <p className="card-info">23 </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>

        {/* Chart */}
        <Row fluid>
          <Col>Chart</Col>
        </Row>

        {/* Activity */}
        <h5 className="mt-2 mb-0">Activities Tracking</h5>
        <Row>
          <Col className="activity">
            <Card className="profile-card">
              <Card.Header className="activity-header h5 p-3">
                Activities Tracking
              </Card.Header>
              <Card.Body className="d-flex justify-content-center gap-3">
                <Button className="activity-btn">Create Activity</Button>

                {/* activities added */}
                <Card>
                  <Card.Body>
                    <Image src="" />
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>

          {/* Goals */}
          <Col className="goals"></Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default DashBoardPage;
