import React, { useState, useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import "./Schedule.scss";

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchups: null,
    };
  }

  matchupList = [];

  componentDidMount() {
    this.getSearchResults();
  }

  getSearchResults = () => {
    axios
      .get(`https://statsapi.web.nhl.com/api/v1/schedule`)
      .then((result) => {
        this.makeSchedule(result.data.dates[0].games);
        this.setState({ matchups: result.data.dates[0].games });
      })
      .catch((err) => console.log("Error on Schedule Search Response:", err));
  };

  makeSchedule = (matchups) => {
    matchups.map((matchup) => {
      this.matchupList.push([
        matchup.teams.home.team.name,
        matchup.teams.away.team.name,
      ]);
    });
    console.log("matchupList::::", this.matchupList);
    this.buildHomeTeamList(this.matchupList);
    this.buildAwayTeamList(this.matchupList);
  };

  homeTeams = null;
  awayTeams = null;

  buildHomeTeamList = (matchupList) => {
    this.homeTeams = matchupList.map((teamNames) => {
      return <ListGroup.Item>{teamNames[0]}</ListGroup.Item>;
    });
  };

  buildAwayTeamList = (matchupList) => {
    this.awayTeams = matchupList.map((teamNames) => {
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
            <ListGroup vertical>{this.homeTeams}</ListGroup>
          </div>
          <div className="awayList">
            Away
            <ListGroup vertical>{this.awayTeams}</ListGroup>
          </div>
        </div>
      </div>
    );
  }
}
