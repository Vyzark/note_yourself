const router = require("express").Router();

const { getUserTags, createTag, deleteTag } = require("../../controllers/tags.controller");
const validateToken = require("../../middlewares/validateToken");

// GET
router.get("/", validateToken, getUserTags);

// POST
router.post("/", validateToken, createTag);

// DELETE
router.delete("/:name", validateToken, deleteTag);

module.exports = router;
