import React, { useState, useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import "./Schedule.scss";
import moment from "moment";

let searchResults = null;
let matchupList = [];
let homeTeams = null;
let awayTeams = null;
let gameDayDetails = null;

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchups: null,
      day: "0",
      daySelected: 0,
      weekMatchups: null,
      gameDayHeadingMessage: null,
    };
  }

  componentDidMount() {
    this.getSearchResults(0);
  }

  // takes momentjs formatted date and converts to one the API accepts
  // argument example: console.log(moment().format("L"));
  formateDate = (date) => {
    const year = date.substr(6);
    const month = date.substr(0, 2);
    const day = date.substr(3, 2);
    return `${year}-${month}-${day}`;
  };

  getSearchResults = (day) => {
    const today = this.formateDate(moment().format("L"));
    const endDate = this.formateDate(moment().add(7, "days").calendar());
    axios
      .get(
        `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${today}&endDate=${endDate}`
      )
      .then((result) => {
        this.makeSchedule(result.data.dates[day].games);
        this.setState({
          matchups: result.data.dates[day].games,
          weekMatchups: result.data.dates,
        });
        this.buildGameDayHeader(day);
        console.log("list of games for the week: ", result.data.dates);
        console.log(
          "matchups: result.data.dates[day].games",
          result.data.dates[day].games
        );
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

  buildGameDayHeader = (day) => {
    const gamesPerDay = this.state.weekMatchups[day].totalItems;
    let numOfGamesMsg = "";
    if (gamesPerDay === 1) {
      numOfGamesMsg = `There is 1 game on this date.`;
    } else if (gamesPerDay > 1) {
      numOfGamesMsg = `There are ${gamesPerDay} games on this date.`;
    } else {
      numOfGamesMsg = "There are no games scheduled today.";
    }
    this.setState({ gameDayHeadingMessage: numOfGamesMsg });
    console.log("DATE", moment().add(10, "days").format("MMM Do YYYY"));
  };

  render() {
    return (
      <div>
        <h1>Make your Picks</h1>
        <div>{this.state.gameDayHeadingMessage}</div>
        <div className="dayNav">
          <div>
            <a onClick={() => this.getSearchResults(0)}>Today</a>
          </div>
          <div>
            <a onClick={() => this.getSearchResults(1)}>
              {moment().add(1, "days").format("dddd MMM Do")}
            </a>
          </div>
          <div>
            <a onClick={() => this.getSearchResults(2)}>
              {moment().add(2, "days").format("dddd MMM Do")}
            </a>
          </div>
          <div>
            <a onClick={() => this.getSearchResults(3)}>
              {moment().add(3, "days").format("dddd MMM Do")}
            </a>
          </div>
          <div>
            <a onClick={() => this.getSearchResults(4)}>
              {moment().add(4, "days").format("dddd MMM Do")}
            </a>
          </div>
          <div>
            <a onClick={() => this.getSearchResults(5)}>
              {moment().add(5, "days").format("dddd MMM Do")}
            </a>
          </div>
          <div>
            <a onClick={() => this.getSearchResults(6)}>
              {moment().add(6, "days").format("dddd MMM Do")}
            </a>
          </div>
          <div>
            <a onClick={() => this.getSearchResults(7)}>
              {moment().add(7, "days").format("dddd MMM Do")}
            </a>
          </div>
        </div>
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
