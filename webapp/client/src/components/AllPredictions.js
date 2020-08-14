import React, { useState, useEffect } from "react";
import classes from "./../styles/allPredictions.module.css";
import UserServcie from "../services/user.service";
import IconOk from "../static/icons8-ok-64.png";
import IconNo from "../static/icons8-close-window-64.png";
function AllPredictions() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    UserServcie.getAllPredictions()
      .then((res) => {
        console.log(res.data);
        setNews(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {};
  }, []);

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

  const renderNews = () => {
    return news.map((singleNew) => {
      const style = singleNew.isFake ? { ...styels.fake } : { ...styels.real };
      console.log(style);

      return (
        <div
          className="ui placeholder container-login100 segment "
          style={{ ...style, margin: 0, position: "relative" }}
        >
          <div className="ui icon header">
            <h3 className="ui header">{singleNew.content}</h3>
          </div>
          <div
            className="extra content"
            style={{
              position: "absolute",
              left: "7%",
              bottom: "3%",
              padding: "2px",
            }}
          >
            {singleNew.user.userName}
          </div>{" "}
          <div
            style={{
              position: "absolute",
              right: "5%",
              bottom: "0.002%",
              
            }}
          >
            {!singleNew.isFake ? (
              <img src={IconOk} alt="React Logo" />
            ) : (
              <img src={IconNo} alt="React Logo" />
            )}
          </div>
        </div>
      );
    });
  };
  return <div className={classes.gridContainer}>{renderNews()}</div>;
}

AllPredictions.propTypes = {};

export default AllPredictions;
