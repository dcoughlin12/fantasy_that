import React, { useState } from "react";
import "./Home.scss";
import Form from "react-bootstrap/Form";

export default function Home(props) {
  const [urlGiven, setUrlGiven] = useState("");

  return (
    <div className="home">
      <h1 className="homeTitle">Welcome to Fantasy That</h1>
      <div className="homeContent">
        <h2>Your home for Daily Fantasy Hockey</h2>
        <Form.Control
          value={urlGiven}
          onChange={(event) => setUrlGiven(event.target.value)}
          type="text"
          placeholder="Enter League URL"
          className="urlForm"
        />
      </div>
    </div>
  );
}
