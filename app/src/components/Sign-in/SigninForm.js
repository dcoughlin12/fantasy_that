import React, { useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./SigninForm.scss";

export default function SignInForm(props) {
  const location = useLocation();
  const urlGiven = location.state ? location.state.urlGiven : null;
  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState(props.password || "");
  const [error, setError] = useState("");
  const { setAuth, setLoggedUser } = props;
  let history = useHistory();

  const authenticateUser = (user) => {
    if (typeof user === "object") {
      setAuth((prev) => !prev);
      history.push("/schedule");
    }
  };

  const validate = () => {
    if (!email) {
      setError("Email cannot be blank.");
      return;
    }
    if (!email.includes("@")) {
      setError("This is not a valid email.");
      return;
    }
    if (!password) {
      setError("Password cannot be blank.");
      return;
    }
    setError("");
    const user = {
      email,
      password,
    };
    axios
      .post("http://localhost:3001/userLogin", user)
      .then((result) => {
        if (!result.data) {
          setError("Invalid Email/Password combination.");
        } else {
          const newUserData = result.data;
          setLoggedUser(newUserData);
          authenticateUser(newUserData);
        }
      })
      .catch((err) => console.log("THIS IS ERROR", err));
  };

  return (
    <div className="authForm">
      <h1 className="pageTitle">Login</h1>
      {error && <p>{error}</p>}
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" onClick={() => validate()}>
          Submit
        </Button>
      </Form>
      <p className="link-reg">
        Don't have an account? &nbsp;
        <Link
          to={{
            pathname: "/signup",
          }}
          className="link-reg"
        >
          Register Here
        </Link>
      </p>
    </div>
  );
}
