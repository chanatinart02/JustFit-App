import React from "react";
import { Container } from "react-bootstrap";

import Layout from "../../component/Layout";

function DashBoardPage() {
  return (
    <Layout>
      <Container>
        <h1>Hello, Karina</h1>
        <p>Keep Moving & Stay Healty</p>
        <div className="total-profile">
          <div className="total"></div>
          <div className="profile-info"></div>
        </div>
      </Container>
    </Layout>
  );
}

export default DashBoardPage;
