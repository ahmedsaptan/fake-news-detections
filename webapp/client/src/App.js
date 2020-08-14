import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import DetectFake from "./components/DetectFake";
import AllPredictions from "./components/AllPredictions";
import MyPredictions from "./components/MyPredictions";
import "./styles/login/main.css";
import "./styles/login/util.css";
import AuthService from "./services/auth.service";

export const UserContext = React.createContext();

export default function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const u = AuthService.getCurrentUser();
    console.log(u);
    if (u) {
      setUser(u);
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <div className="limiter">
          <div className="container-login100">
            <div style={{ marginTop: "80px", width: "60%" }}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/detect-news" exact component={DetectFake} />
                <Route
                  path="/all-predictions"
                  exact
                  component={AllPredictions}
                />
                <Route path="/my-predictions" exact component={MyPredictions} />
              </Switch>
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
}
