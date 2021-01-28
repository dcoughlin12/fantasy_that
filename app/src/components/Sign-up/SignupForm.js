import React, { useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SignupForm.scss";
import axios from "axios";

export default function SignupForm(props) {
  const location = useLocation();
  const urlGiven = location.state ? location.state.urlGiven : null;
  const { setAuth, setLoggedUser } = props;
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  let history = useHistory();

  function createUser(event) {
    event.preventDefault();

    if (!firstName) {
      setError("First name is required.");
      return;
    }
    if (!email) {
      setError("E-mail is required.");
      return;
    }
    if (!email.includes("@")) {
      setError("This is not a valid email.");
      return;
    }
    if (!password) {
      setError("A password is required.");
      return;
    }
    if (!retypePassword) {
      setError("A password confirmation is required.");
      return;
    }
    if (password !== retypePassword) {
      setError("The passwords provided don't match.");
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    axios
      .post("http://localhost:3001/user", user)
      .then((result) => {
        console.log("simple result obj", result);
        let newUserData = result.data;
        console.log("result after signup:", newUserData);
        setLoggedUser(newUserData);
        setAuth((prev) => !prev);
        history.push("/Schedule");
      })
      .catch((err) => console.log("ERROR ON POST", err));
  }

  return (
    <div className="authForm">
      <h1 className="pageTitle">Register</h1>
      {error && <p>{error}</p>}
      <Form className="form">
        <div id="sections-container">
          <section class="">
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Form.Text className="text-muted">
                I'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPasswordConfirmation">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={retypePassword}
                onChange={(event) => setRetypePassword(event.target.value)}
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button variant="primary" onClick={(event) => createUser(event)}>
                Submit
              </Button>
              <p className="link-reg">
                Already have an account? &nbsp;
                <Link className="link-reg" to="/signin">
                  Login Here
                </Link>
              </p>
            </div>
          </section>
        </div>
      </Form>
    </div>
  );
}
