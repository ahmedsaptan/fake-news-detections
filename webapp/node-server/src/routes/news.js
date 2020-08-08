const express = require("express");
const router = new express.Router();

router.post("/news", (req, res) => {
  const new1 = new New(req.body);
  console.log(new1);
  res.send({
    new: new1,
  });
});

router.get("/news", (req, res) => {
  New.find({}).then((news) => {
    console.log(news);
    res.send(news);
  });
});

router.get("/news/me", (req, res) => {});

module.exports = router;
