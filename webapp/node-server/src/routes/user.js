const express = require("express");
const router = new express.Router();
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((u) => {
      res.status(201).send({
        user: u,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e.message);
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    console.log(chalk.redBright.magenta(user));
    const token = await jwt.sign(
      { email: user.email, userName: user.userName, userId: user._id },
      "whateverysecret"
    );
    console.log(chalk.cyan.bold.bgBlue(token));
    res.status(200).send({ accessToken: token, userName: user.userName });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: e,
    });
  }
});

module.exports = router;
