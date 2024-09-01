const {
    getUserNotes,
    getActiveUserNotes,
    getArchivedUserNotes,
    getUserNotesByTag,
    createNote,
    updateNote,
    updateNoteArchivedStatus,
    deleteNote,
} = require("../../controllers/notes.controller");
const validateToken = require("../../middlewares/validateToken");

const router = require("express").Router();

// GET
router.get("/", validateToken, getUserNotes);
router.get("/tag", validateToken, getUserNotesByTag);
router.get("/active", validateToken, getActiveUserNotes);
router.get("/archived", validateToken, getArchivedUserNotes);

// POST
router.post("/", validateToken, createNote);

// PUT
router.put("/archive/:id", validateToken, updateNoteArchivedStatus);
router.put("/:id", validateToken, updateNote);

// DELETE
router.delete("/:id", validateToken, deleteNote);

module.exports = router;
