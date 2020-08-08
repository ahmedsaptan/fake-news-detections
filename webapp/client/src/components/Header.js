import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const Header = () => {
  return (
    <div className="ui large menu top fixed">
      <NavLink activeClassName="active" className="item" to="/">
        FakeDetect
      </NavLink>

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

        <div className="item">
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
      </div>
    </div>
  );
};

export default Header;
