const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/fakenews",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("CONNETED 2 MONGODB");
  }
);
