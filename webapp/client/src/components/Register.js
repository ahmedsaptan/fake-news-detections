import React, { useState } from "react";
import isEmail from "validator/es/lib/isEmail";
import AuthService from "../services/auth.service";
import image from "./../styles/images/img-01.png";
import { Link } from "react-router-dom";

function Register(props) {
  const [userName, setUserName] = useState("");
  const [emailExist, setEmailExist] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password1: "",
    password2: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!isEmail(email)) {
      setErrors({
        ...errors,
        email: true,
      });
    } else {
      setErrors({
        ...errors,
        email: false,
      });
    }
  };

  const passwordValidate = (e) => {
    const pass2 = e.target.value;
    setPassword({ ...password, password2: pass2 });
    if (password.password1 !== pass2) {
      setErrors({
        ...errors,
        password: true,
      });
    } else {
      setErrors({
        ...errors,
        password: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.register(userName, email, password.password1)
      .then((s) => {
        setEmailExist(false);
        props.history.push("/login");
      })
      .catch((e) => {
        setEmailExist(true);
        console.log(e);
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
            <span className="login100-form-title">Member Register</span>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="userName"
                placeholder="userName"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="Email"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            {errors.email && (
              <div
                className="text-center p-t-12 error"
                style={{ color: "red", marginBottom: "1rem" }}
              >
                <h5>Email Not Valid</h5>
              </div>
            )}

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass1"
                value={password.password1}
                onChange={(e) =>
                  setPassword({ ...password, password1: e.target.value })
                }
                placeholder="Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass2"
                value={password.password2}
                onChange={passwordValidate}
                placeholder="Confirme Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            {errors.password && (
              <div
                className="text-center p-t-12 error"
                style={{ color: "red" }}
              >
                <h5>Password Not Match</h5>
              </div>
            )}
            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Register
              </button>
            </div>

            {emailExist && (
              <div
                className="text-center p-t-12 error"
                style={{ color: "red" }}
              >
                <h5>Email Already Exist</h5>
              </div>
            )}
            <div className="text-center p-t-136">
              <Link className="txt2" to="/login">
                Alreday Have An Account ?
                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {};

export default Register;
