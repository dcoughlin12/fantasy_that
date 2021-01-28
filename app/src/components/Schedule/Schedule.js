import React, { useState, useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import "./Schedule.scss";
import moment from "moment";

let searchResults = null;
let matchupList = [];
let homeTeams = null;
let awayTeams = null;

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchups: null,
      day: "0",
    };
  }

  componentDidMount() {
    this.getSearchResults();
  }

  // takes momentjs formatted date and converts to one the API accepts
  // argument example: console.log(moment().format("L"));
  formateDate = (date) => {
    const year = date.substr(6);
    const month = date.substr(0, 2);
    const day = date.substr(3, 2);
    return `${year}-${month}-${day}`;
  };

  getSearchResults = () => {
    const today = this.formateDate(moment().format("L"));
    const endDate = this.formateDate(moment().add(7, "days").calendar());
    axios
      .get(
        // `https://statsapi.web.nhl.com/api/v1/schedule`
        `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${today}&endDate=${endDate}`
      )
      .then((result) => {
        this.makeSchedule(result.data.dates[0].games);
        this.setState({ matchups: result.data.dates[0].games });
      })
      .catch((err) => console.log("Error on Schedule Search Response:", err));
  };

  makeSchedule = (matchups) => {
    // have to reset the array or else the games are doubled etc each time user navigates away and back to schedule
    if (matchupList.length > 0) {
      matchupList = [];
    }
    matchups.map((matchup) => {
      matchupList.push([
        matchup.teams.home.team.name,
        matchup.teams.away.team.name,
      ]);
    });
    this.buildHomeTeamList(matchupList);
    this.buildAwayTeamList(matchupList);
  };

  buildHomeTeamList = (matchupList) => {
    homeTeams = matchupList.map((teamNames) => {
      return <ListGroup.Item>{teamNames[0]}</ListGroup.Item>;
    });
  };

  buildAwayTeamList = (matchupList) => {
    awayTeams = matchupList.map((teamNames) => {
      return <ListGroup.Item>{teamNames[1]}</ListGroup.Item>;
    });
  };

  render() {
    return (
      <div>
        <h1>Make your Picks</h1>
        <div className="scheduleList">
          <div className="homeList">
            Home
            <ListGroup vertical>{homeTeams}</ListGroup>
          </div>
          <div className="awayList">
            Away
            <ListGroup vertical>{awayTeams}</ListGroup>
          </div>
        </div>
        <Nav
          variant="pills"
          defaultActiveKey="0"
          onSelect={(selectedKey) => this.setState({ day: selectedKey })}
        >
          <Nav.Item>
            <Nav.Link eventKey="0">Today</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="1">Day 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Day 3</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3">Day 4</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="4">Day 5</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="5">Day 6</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="6">Day 7</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}
