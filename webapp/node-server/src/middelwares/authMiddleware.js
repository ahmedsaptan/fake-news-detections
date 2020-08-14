const verfiyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  console.log(token);
  if (typeof token !== "undefined") {
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = verfiyToken;
