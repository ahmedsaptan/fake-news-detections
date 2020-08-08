import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function DetectFake(props) {
  const [link, setLink] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [fake, setFake] = useState(false);
  const [real, setReal] = useState(false);

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        "http://localhost:5000/predict",
        {
          post,
        },
        config
      );

      if (res.data == 0) {
        setFake(true);
      } else if (res.data == 1) {
        setReal(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickLink = async (e) => {
    e.preventDefault();
    if (link !== "") {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post(
          "http://localhost:5000/get-post-data",
          {
            link,
          },
          config
        );

        setPost(res.data);
        setLoading(true);
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <div>
      <div className="ui container segment" style={{ marginTop: "10px" }}>
        <form className="ui form">
          <div className="two fields">
            <div className="field">
              <label>Facebook Post Link</label>
              <textarea
                placeholder="Paste Link Here and data will show "
                rows="2"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              ></textarea>
            </div>
            <div className="field">
              <button className="ui button" onClick={(e) => onClickLink(e)}>
                Submit
              </button>
            </div>
          </div>
          {!loading && (
            <>
              <div className="field">
                <label>Post</label>
                <textarea
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                ></textarea>
              </div>
              <button
                disabled={post == ""}
                className="ui button"
                type="submit"
                onClick={(e) => onClick(e)}
              >
                Submit
              </button>
            </>
          )}
        </form>
        {loading && (
          <div className="ui segment" style={{ padding: "40px 25px" }}>
            <div className="ui active dimmer">
              <div className="ui medium text loader">Loading</div>
            </div>
            <p></p>
          </div>
        )}

        {fake && (
          <div className="ui red message">
            <i className="star icon"></i>
            Fake
          </div>
        )}

        {real && (
          <div className="ui green message">
            <i className="star icon"></i>
            Real
          </div>
        )}
      </div>
    </div>
  );
}

DetectFake.propTypes = {};

export default DetectFake;
