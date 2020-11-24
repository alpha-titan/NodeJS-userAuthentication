const router = require("express").Router();
const verify = require("../middleware/verifyToken");

router.get("/", verify, (req, res) => {
  res.send("hello");
});

module.exports = router;
