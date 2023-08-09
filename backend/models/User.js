const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;
// // WORKING
// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (username, email, password) {
  // validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("E-mail is incorrect");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is too weak");
  }

  const existsEmail = await this.findOne({ email });
  const existsUsername = await this.findOne({ username });

  if (existsEmail) {
    throw Error("E-mail is already used");
  }

  if (existsUsername) {
    throw Error("Username is already used");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (usernameOrEmail, password) {
  if (!usernameOrEmail || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (!user) {
    throw Error("Incorrect username or e-mail");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
