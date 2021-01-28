import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar(props) {
  const { auth, setAuth, loggedUser, setLoggedUser } = props;
  let history = useHistory();
  const clearLogin = () => {
    setAuth((prev) => !prev);
    setLoggedUser("");
    history.push("/home");
  };

  return (
    <div className="completeNav">
      <Navbar bg="dark" expand="lg">
        <Link to="/home">
          <Navbar.Brand className="mainTitle"> Fantasy That </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="rightButtons">
            <Nav className="mr-auto"></Nav>
            <div className="welcomeMsg">
              {auth && `Welcome ${loggedUser.firstName}`}
            </div>
            <Link to="/schedule" className="link-nav">
              Schedule
            </Link>
            {!auth && (
              <Link className="link-nav" to="/signup">
                Register
              </Link>
            )}
            {!auth && (
              <Link className="link-nav" to="/signin">
                Login
              </Link>
            )}
            {auth && (
              <Nav.Link className="link-nav" onClick={() => clearLogin()}>
                Logout
              </Nav.Link>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
