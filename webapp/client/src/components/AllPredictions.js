import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AllPredictions(props) {
  const styels = {
    real: {
      backgroundImage: "linear-gradient(#76f576ab, #61fa6169, #05ff057c)",
      borderRadius: "50px",
    },
    fake: {
      backgroundImage: "linear-gradient(#f57676ab, #fa616169, #ff05057c)",
      borderRadius: "50px",
    },
  };
  return (
    <>
      <div
        className="ui placeholder container-login100 segment "
        style={styels.real}
      >
        <div class="ui icon header">
          <h3 className="ui header">
            You Are tired from fake news chasing you on social media 😭
          </h3>
          <p>You Can Detect It NOW 😉😎 </p>
        </div>
      </div>

      <div
        className="ui placeholder container-login100 segment"
        style={styels.fake}
      >
        <div class="ui icon header">
          <h3 className="ui header">
            You Are tired from fake news chasing you on social media 😭
          </h3>
          <p>You Can Detect It NOW 😉😎 </p>
        </div>
      </div>
    </>
  );
}

AllPredictions.propTypes = {};

export default AllPredictions;
