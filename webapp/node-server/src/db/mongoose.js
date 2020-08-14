const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/fakenews",
  // "mongodb+srv://test123:test123@sandbox-gvz3y.mongodb.net/fakenews?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("CONNETED 2 MONGODB");
  }
);
