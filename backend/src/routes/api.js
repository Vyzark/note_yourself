const router = require("express").Router();

router.use("/user", require("./api/users"));
router.use("/notes", require("./api/notes"));
router.use("/tags", require("./api/tags"));

module.exports = router;
