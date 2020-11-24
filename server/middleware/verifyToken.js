const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = async function (req, res, next) {
  //get the token first
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  //verify the token with the key

  try {
    const verifiedToken = await jwt.verify(token, {your jwt secret here});
    req.user = verifiedToken;
    next();
    console.log(verifiedToken._id);
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
