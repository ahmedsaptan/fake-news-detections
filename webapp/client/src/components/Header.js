import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import AuthService from "../services/auth.service";
import { UserContext } from "./../App";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { accessToken, userName } = user;

  return (
    <div className="ui large menu top fixed">
      <NavLink activeClassName="active" className="item" to="/">
        FakeDetect
      </NavLink>

      {accessToken && (
        <div className="right menu">
          <NavLink
            to="/all-predictions"
            activeClassName="active"
            className="item "
          >
            All Predictions
          </NavLink>
          <NavLink
            activeClassName="active"
            className="item"
            to="/my-predictions"
          >
            My Predictions
          </NavLink>
          <NavLink className="item " to="/detect-news">
            <Button animated inverted color="teal">
              <Button.Content visible>TRY NOW</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </NavLink>
        </div>
      )}

      {!accessToken && (
        <div className="item right">
          <Button.Group>
            <Button>
              <NavLink activeClassName="active" to="/register">
                Sign Up
              </NavLink>
            </Button>
            <Button.Or />
            <Button positive>
              <NavLink activeClassName="active" to="/login">
                Sign In
              </NavLink>
            </Button>
          </Button.Group>
        </div>
      )}
      {accessToken && (
        <div className="item right">
          <Button.Group>
            <Button>{userName}</Button>
            <Button.Or />
            <Button
              negative
              onClick={() => {
                AuthService.logout();
                setUser({});
              }}
            >
              Log Out
            </Button>
          </Button.Group>
        </div>
      )}
    </div>
  );
};

export default Header;
