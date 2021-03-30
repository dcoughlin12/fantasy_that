import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import moment from "moment";
import "./Schedule.scss";

let matchupList = [];
let homeTeams = null;
let awayTeams = null;

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

  // will need to make a get request first to see if user already has a pick (Needs to be on mount)
  //that should set state for a certain pick, maybe it could be an obj for the next 7 days?
  // depending on that state, will need to determine if it is a put of post.
  // set state with result of post/put

  createPick = (pick) => {
    const input = {
      user_id: 1,
      team_id: 1,
      team_name: "devins team",
      date: "oct 23rd",
      points: 1,
    };
    axios
      .post("http://localhost:3001/createPick", input)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error("ERROR ON POST", err));
  };

  buildHomeTeamList = (matchupList) => {
    homeTeams = matchupList.map((teamNames, i) => {
      return <ListGroup.Item key={i}>{teamNames[0]}</ListGroup.Item>;
    });
  };

  buildAwayTeamList = (matchupList) => {
    awayTeams = matchupList.map((teamNames, i) => {
      return <ListGroup.Item key={i}>{teamNames[1]}</ListGroup.Item>;
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
  };

  render() {
    return (
      <div>
        <h1>Make your Picks</h1>
        <button onClick={() => this.createPick()}>
          post for devins team to won
        </button>
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
        <div>{this.state.gameDayHeadingMessage}</div>
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
