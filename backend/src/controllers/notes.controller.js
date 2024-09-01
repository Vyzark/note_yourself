const prisma = require("../config/prismaClient");

const getUserNotes = async (req, res, next) => {
    const userId = req.user.id;

    try {
        // Get user notes
        const userNotes = await prisma.note.findMany({
            where: {
                userId,
            },
            include: { tags: true },
            orderBy: [{ updatedAt: "desc" }, { title: "asc" }],
        });

        res.json(userNotes);
    } catch (error) {
        next(error);
    }
};

const getArchivedUserNotes = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const userNotes = await prisma.note.findMany({
            where: {
                userId,
                archived: true,
            },
            include: { tags: true },
            orderBy: [{ updatedAt: "desc" }, { title: "asc" }],
        });

        res.json(userNotes);
    } catch (error) {
        next(error);
    }
};

const getActiveUserNotes = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const userNotes = await prisma.note.findMany({
            where: {
                userId,
                archived: false,
            },
            include: { tags: true },
            orderBy: [{ updatedAt: "desc" }, { title: "asc" }],
        });

        res.json(userNotes);
    } catch (error) {
        next(error);
    }
};

const getUserNotesByTag = async (req, res, next) => {
    const userId = req.user.id;
    const tag = req.body.tag;

    // Check if tag exists for possible early status return
    const tagExists =
        (await prisma.tag.findFirst({
            where: {
                name: { contains: tag },
            },
        })) !== null;

    if (!tagExists) {
        return res.status(404).json({ result: null, message: "Tag not found" });
    }

    // Get user notes with tag
    try {
        const userNotesWithTag = await prisma.note.findMany({
            where: {
                AND: [{ userId }, { tags: { some: { name: { contains: tag } } } }],
            },
            include: { tags: true },
            orderBy: [{ updatedAt: "desc" }, { title: "asc" }],
        });

        res.json(userNotesWithTag);
    } catch (error) {
        next(error);
    }
};

const createNote = async (req, res, next) => {
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    tagList = tags.split(",").map(tag => tag.trim());

    try {
        const newNote = await prisma.note.create({
            data: {
                title,
                content,
                user: { connect: { id: userId } },
                tags: {
                    connectOrCreate: tagList.map(tagName => {
                        return {
                            where: { name: tagName },
                            create: { name: tagName, user: { connect: { id: userId } } },
                        };
                    }),
                },
            },
            include: { tags: true },
        });

        res.json(newNote);
    } catch (error) {
        next(error);
    }
};

const updateNote = async (req, res, next) => {
    const { title, content, tags, archived } = req.body;
    const userId = req.user.id;
    const id = parseInt(req.params.id);

    //Check if note exists
    const noteExists = await prisma.note.findUnique({
        where: { id },
    });

    if (!noteExists) {
        return res.status(404).json({ message: "Note not found" });
    }

    tagList = tags.split(",").map(tag => tag.trim());

    // Update existing note
    try {
        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                title,
                content,
                archived,
                tags: {
                    delete: true,
                },
                tags: {
                    connectOrCreate: tagList.map(tagName => {
                        return {
                            where: { name: tagName },
                            create: { name: tagName, user: { connect: { id: userId } } },
                        };
                    }),
                },
            },
            include: { tags: true },
        });

        res.json(updatedNote);
    } catch (error) {
        next(error);
    }
};

const updateNoteArchivedStatus = async (req, res, next) => {
    const { archived } = req.body;
    const id = parseInt(req.params.id);

    //Check if note exists
    const noteExists = await prisma.note.findUnique({
        where: { id },
    });

    if (!noteExists) {
        return res.status(404).json({ message: "Note not found" });
    }

    // Update existing note
    try {
        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                archived,
            },
            include: { tags: true },
        });

        res.json(updatedNote);
    } catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
        // Delete existing note
        const deletedNote = await prisma.note.delete({
            where: { id },
        });

        res.json({ message: `Note ${id} deleted`, deletedNote });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserNotes,
    getArchivedUserNotes,
    getActiveUserNotes,
    getUserNotesByTag,
    createNote,
    updateNote,
    updateNoteArchivedStatus,
    deleteNote,
};
