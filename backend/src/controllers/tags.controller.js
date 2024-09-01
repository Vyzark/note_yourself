const prisma = require("../config/prismaClient");

const getUserTags = async (req, res, next) => {
    try {
        const userTags = await prisma.tag.findMany({
            where: {
                userId: req.user.id,
            },
            orderBy: [{ createdAt: "desc" }, { name: "asc" }],
        });

        res.json(userTags);
    } catch (error) {
        next(error);
    }
};

const createTag = async (req, res, next) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
        if (!name) {
            return res.status(400).json({ message: "Tag name cannot be empty" });
        }

        const tagExists = await prisma.tag.findUnique({
            where: { name },
        });

        if (tagExists) {
            return res.status(400).json({ message: "Tag already exists" });
        }

        // Create new tag
        const newTag = await prisma.tag.create({
            data: {
                name,
                user: { connect: { id: userId } },
            },
        });
        console.log(newTag);

        res.json(newTag);
    } catch (error) {
        next(error);
    }
};

const deleteTag = async (req, res, next) => {
    const name = req.params.name;

    try {
        await prisma.tag.delete({ where: { name } });

        res.json({ message: `${name} tag deleted` });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUserTags, createTag, deleteTag };
