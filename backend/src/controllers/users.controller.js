const bcrypt = require("bcryptjs");
const prisma = require("../config/prismaClient");
const { createToken } = require("../helpers/createToken");

const INVALID_CREDENTIALS = "Incorrect Email/Password";

const register = async (req, res, next) => {
    const { name, surname, username, email, password } = req.body;

    try {
        const userExists = await prisma.user.findUnique({ where: { email } });

        // Check if email already exists in database
        if (userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Check if username already exists in database
        const usernameExists = await prisma.user.findUnique({ where: { username }, select: { username: true } });
        if (usernameExists) {
            return res.status(400).json({ message: "Username already registered" });
        }

        // Hash password before inserting into database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user in database
        const user = await prisma.user.create({
            data: {
                name,
                surname,
                username,
                email,
                password: hashedPassword,
            },
        });

        // Create user login token and send it to client
        const token = createToken(user);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: INVALID_CREDENTIALS });
        }

        const validCredentials = await bcrypt.compare(password, user.password);

        // Check if password is valid
        if (!validCredentials) {
            return res.status(404).json({ message: INVALID_CREDENTIALS });
        }

        // Create user login token and send it to client
        const token = createToken(user);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};
