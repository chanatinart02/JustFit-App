import { NavDropdown, Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";

import "./Header.css";
import LoginBtn from "../LoginBtn/LoginBtn";
import SignUpBtn from "../SingUpBtn/SignUpBtn";
import { auth } from "../../services/firebase";
import { user2 } from "../../assets";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { currentUser, setToken, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setToken(null);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(err);
    }
  };
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
              {currentUser ? (
                <div className="user">
                  <Image
                    width="56px"
                    height="56px"
                    src={currentUser.avatar || user2}
                    roundedCircle
                    fluid
                  />
                  <NavDropdown
                    title={currentUser.name || "Anonymous"}
                    id="basic-nav-dropdown"
                    style={{ fontSize: "1rem !important" }}
                  >
                    <NavDropdown.Item href="/profile">
                      My profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <>
                  <LoginBtn />
                  <SignUpBtn variant="primary" />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
