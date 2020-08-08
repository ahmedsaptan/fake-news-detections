const mongoose = require("mongoose");

const New = mongoose.model("New", {
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  fake: {
    type: Boolean,
    default: false,
  },
});
