import React, { useState } from "react";
import UserService from "../services/user.service";
import IconOk from "../static/icons8-ok-64.png";
import IconNo from "../static/icons8-close-window-64.png";

function DetectFake(props) {
  const [link, setLink] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [fake, setFake] = useState(false);
  const [real, setReal] = useState(false);

  const onSubmitForm = async () => {
    setFake(false);
    setReal(false);

    try {
      setLoading(true);
      const res = await UserService.predict({ post }, true);
      setLoading(false);

      console.log(res.data);
      if (res.data.label < 0.5) {
        setFake(true);
      } else if (res.data.label >= 0.5) {
        setReal(true);
      }

      // setTimeout(() => {
      //   props.history.push("/my-predictions");
      // }, 5000);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const onClickLink = async (e) => {
    e.preventDefault();
    if (link !== "") {
      setLoading(true);
      try {
        const res = await UserService.GetPostFromLink(link, true);

        setPost(res.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);

        console.log(e.message);
      }
    } else {
      alert("you Must enter a link");
    }
  };
  return (
    <div className="ui container segment">
      <form className="ui form">
        <i
          className="red huge newspaper icon"
          style={{ display: "inline-block", marginRight: "1rem" }}
        ></i>
        <h2 className="ui dividing header" style={{ display: "inline-block" }}>
          News Detection !{" "}
        </h2>
        <div className="field">
          <i
            className="blue big facebook icon"
            style={{ display: "inline-block", marginRight: "10px" }}
          ></i>
          <h2 style={{ display: "inline-block" }}>FaceBook URL</h2>
          <div className="two fields">
            <div className="field">
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Facebook Url here"
              />
            </div>
            <div className="field">
              <button
                className="ui primary button"
                onClick={(e) => onClickLink(e)}
              >
                Get Post
              </button>
            </div>
          </div>
        </div>
        <div className="field" style={{ marginTop: "1rem" }}>
          <i
            className="blue big comment icon"
            style={{ display: "inline-block", marginRight: "1rem" }}
          ></i>
          <h2 style={{ display: "inline-block" }}>Post Data</h2>
          <div className="field">
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              spellCheck="false"
              placeholder="Enter the post Data"
            ></textarea>
          </div>
        </div>

        <div
          className="ui primary button"
          onClick={(e) => {
            e.preventDefault();
            onSubmitForm();
          }}
        >
          Predict
        </div>
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
        <div
          className="ui red message"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={IconNo} />
          <h3 style={{ margin: 0 }}>FAKE</h3>
        </div>
      )}

      {real && (
        <div
          className="ui green message"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={IconOk} />
          <h3 style={{ margin: 0 }}>REAL</h3>
        </div>
      )}
    </div>
  );
}

export default DetectFake;
