const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
require("./src/db/mongoose");

const userRouter = require("./src/routes/user");
const newsRouter = require("./src/routes/news");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(userRouter);
app.use(newsRouter);


const PORT = 9000;
app.listen(PORT, () => {
  console.log(`SERVER IS ON ${PORT}`);
});
