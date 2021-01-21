import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Home from "./components/Home/Home";
import SigninForm from "./components/Sign-in/SigninForm";
import SignupForm from "./components/Sign-up/SignupForm";
import Schedule from "./components/Schedule/Schedule";

export default function App() {
  return (
    <div className="App">
      <Router>
        <main>
          {/* <NavBar /> */}
          <section>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home" component={() => <Home />} />
              <Route path="/signup" component={() => <SignupForm />} />
              <Route path="/signin" component={() => <SigninForm />} />
              <Route path="/schedule" component={() => <Schedule />} />
              <Route path="*">
                <h3 className="page-not-found">404 Page Not Found</h3>
              </Route>
            </Switch>
          </section>
        </main>
      </Router>
    </div>
  );
}
