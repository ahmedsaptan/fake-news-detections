import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Icon, Button } from "semantic-ui-react";

function Footer(props) {
  return (
    <div class="ui inverted bottom menu">
      <a class="item">Features</a>
      <a class="item">Testimonials</a>
      <a class="item">Sign-in</a>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
