import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import LoginBtn from "../LoginBtn/LoginBtn";
import SignUpBtn from "../SingUpBtn/SignUpBtn";

const Header = () => {
  return (
    <div className="navbar-container">
      <Navbar className="header sticky-top" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="logo">
            Just<span>Fit</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Link href="/workOut">Workout Videos</Nav.Link>
              <Nav.Link href="/recipes">Recipes</Nav.Link>
              <Nav.Link href="/dashBoard">Dash board</Nav.Link>
            </Nav>
            <Nav className="collapse-btn">
              <LoginBtn />
              <SignUpBtn variant="primary" />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
