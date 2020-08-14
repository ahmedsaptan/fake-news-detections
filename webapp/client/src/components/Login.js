import React, { useState, useContext } from "react";
import image from "./../styles/images/img-01.png";
import AuthService from "../services/auth.service";
import "../styles/login/main.css";
import "../styles/login/util.css";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { _, setUser } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(email, password)
      .then((response) => {
        console.log(response);
        setUser(response);
        setLoginError(false);
        props.history.push("/");
      })
      .catch((e) => {
        setLoginError(true);
      });
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={image} alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">Member Login</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Email"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Login</button>
            </div>

            {loginError && (
              <div
                className="text-center p-t-12 error"
                style={{ color: "red" }}
              >
                <h3>Unable to login</h3>
              </div>
            )}

            <div className="text-center p-t-136">
              <Link className="txt2" to="/register">
                Create your Account
                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
