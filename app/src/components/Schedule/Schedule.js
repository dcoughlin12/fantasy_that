import React, { useState, useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import "./Schedule.scss";

let matchupList = [];
let homeTeams = null;
let awayTeams = null;

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchups: null,
    };
  }

  componentDidMount() {
    this.getSearchResults();
  }

  createUserAxios() {
    const user = {
      name: "TEST NAME 5",
      email: "5TEST@email.COM",
      password: "1",
    };

    axios
      .post("http://localhost:3001/user", user)
      .then((result) => {
        console.log("RESULT", result.data);
      })
      .catch((err) => console.log(err));
  }

  getSearchResults = () => {
    axios
      .get(
        `https://statsapi.web.nhl.com/api/v1/schedule`
        // `https://statsapi.web.nhl.com/api/v1/schedule?startDate=2021-01-15&endDate=2021-01-21`
      )
      .then((result) => {
        this.makeSchedule(result.data.dates[0].games);
        this.setState({ matchups: result.data.dates[0].games });
      })
      .catch((err) => console.log("Error on Schedule Search Response:", err));
  };

  makeSchedule = (matchups) => {
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
        <button onClick={this.createUser}>CREATE USER</button>
        <button onClick={this.createUserAxios}>CREATE USER AXIOS</button>
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
      </div>
    );
  }
}
