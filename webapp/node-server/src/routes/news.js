const express = require("express");
const router = new express.Router();
const New = require("../models/New");
const jwt = require("jsonwebtoken");
const verfiyToken = require("../middelwares/authMiddleware");
const { Builder, By, Key, until } = require("selenium-webdriver");

router.post("/news", (req, res) => {
  const new1 = new New(req.body);
  console.log(new1);
  res.send({
    new: new1,
  });
});

router.get("/news", (req, res) => {
  New.find({})
    .sort("-createdAt")
    .populate("user")
    .then((news) => {
      console.log(news);
      res.status(200).send(news);
    });
});

router.get("/news/me", verfiyToken, async (req, res) => {
  if (req.token) {
    userData = jwt.verify(req.token, "whateverysecret");
    const chalk = require("chalk");
    console.log(chalk.redBright.bgBlue("here"));
    console.log(userData);
    const news = await New.find({ user: userData.userId })
      .sort("-createdAt")
      .populate("user");
    console.log(chalk.blueBright.bgBlack("news"));
    console.log(news);
    res.status(200).send(news);
  } else {
    res.status(404).send({
      message: "please send Token",
    });
  }
});

router.post("/news/predict", verfiyToken, async (req, res) => {
  let userData = null;
  const label = Math.random();
  if (req.token) {
    userData = jwt.verify(req.token, "whateverysecret");
  }
  const newNew = new New({
    content: req.body.content,
    isFake: label < 0.5,
    user: userData.userId,
  });

  console.log(newNew);

  newNew
    .save()
    .then((n) => {
      setTimeout(() => {
        res.status(200).send({
          new: n,
          label,
        });
      }, 5000);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.post("/get-post-data", (req, res) => {
  setTimeout(() => {
    res
      .status(200)
      .send(
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhh hdslkkdfs shlfklsf lljasf ;jaf;skf lafslshlaf as;lk;kaf "
      );
  }, 5000);
});

module.exports = router;
