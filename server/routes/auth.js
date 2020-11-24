const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  //VALIDATION

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if username exist

  const usernameExist = await User.findOne({ username: username });
  if (usernameExist) return res.status(400).send("Username already exists");

  //check if email exist

  const emailExist = await User.findOne({ email: email });
  if (emailExist) return res.status(400).send("Email already exists");

  //hash the password

  const salt = await bcrypt.genSalt(12); //creating salt
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //validation

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exists

  const userExist = await User.findOne({ username: username });
  if (!userExist) return res.status(400).send("User does not exist");

  const valid = await bcrypt.compare(req.body.password, userExist.password);
  if (!valid) return res.status(400).send("Incoorect password");

  const token = jwt.sign({ _id: userExist._id }, {Put your jwt secret here});
  res.header("auth-token", token);
  console.log(token);

  res.send("Logged In !!!");
});

module.exports = router;
