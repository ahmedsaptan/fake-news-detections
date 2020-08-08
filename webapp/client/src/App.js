import React, { Fragment, useState } from "react";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import DetectFake from "./components/DetectFake";
import AllPredictions from "./components/AllPredictions";
import MyPredictions from "./components/MyPredictions";
import Footer from "./components/Footer";
import "./styles/login/main.css";
import "./styles/login/util.css";

export default function App() {
  return (
    <>
      <Header />
      <div className="limiter">
        <div className="container-login100">
          <div style={{ marginTop: "80px", width: "60%" }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/detect-news" exact component={DetectFake} />
              <Route path="/all-predictions" exact component={AllPredictions} />
              <Route path="/my-predictions" exact component={MyPredictions} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}
