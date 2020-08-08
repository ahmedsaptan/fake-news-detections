const express = require("express");
const router = new express.Router();
const User = require("./../models/User");

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
    console.log(user);
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send({
      error: e,
    });
  }
});

module.exports = router;
