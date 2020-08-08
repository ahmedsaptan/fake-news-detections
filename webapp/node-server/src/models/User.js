const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  news: [
    {
      new: {
        type: String,
        required: true,
      },
      fake: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log(user.password);
  user.password = await bcrypt.hash(user.password, 8);

  next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new Error("Unable To login");
  }

  console.log(password, user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable To login");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
