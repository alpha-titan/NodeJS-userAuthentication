const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

const authReq = require("./routes/auth");
const postReq = require("./routes/posts");

const app = express();

PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//connect to database

mongoose.connect(
  {type your mongoDb URL},
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

//Routes

app.use("/api/user", authReq);
app.use("/api/posts", postReq);
// mongoose.connect()

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
