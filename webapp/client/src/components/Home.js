import React from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Icon, Button } from "semantic-ui-react";

const Home = () => {
  return (
    <>
      <div class="ui placeholder container-login100 segment">
        <div class="ui icon header">
          <i class="search icon"></i>
          <h3 className="ui header">
            You Are tired from fake news chasing you on social media 😭
          </h3>
          <p>You Can Detect It NOW 😉😎 </p>
        </div>

        <Link class="ui teal button" to="/detect-news">
          TRY NOW
        </Link>
      </div>
    </>
  );
};

export default Home;
