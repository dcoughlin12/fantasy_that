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
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : ""
  );
  console.log("LOGGED USER FROM APP::", loggedUser);
  const [auth, setAuth] = useState(loggedUser ? true : false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loggedUser));
  }, [loggedUser]);

  return (
    <div className="App">
      <Router>
        <main>
          <NavBar
            loggedUser={loggedUser}
            auth={auth}
            setAuth={setAuth}
            setLoggedUser={setLoggedUser}
          />
          <section>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home" component={() => <Home />} />
              <Route
                path="/signup"
                component={() => (
                  <SignupForm
                    loggedUser={loggedUser}
                    auth={auth}
                    setLoggedUser={setLoggedUser}
                    setAuth={setAuth}
                  />
                )}
              />
              <Route
                path="/signin"
                component={() => (
                  <SigninForm
                    loggedUser={loggedUser}
                    auth={auth}
                    setAuth={setAuth}
                    setLoggedUser={setLoggedUser}
                  />
                )}
              />
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
