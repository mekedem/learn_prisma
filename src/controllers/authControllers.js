import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
        where: { email },
    });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const token = generateToken(user.id, res);

    res
    .status(201)
    .json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
            },
        }
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id, res);

    res.status(200).json({
        status: "success",
        data: {
            user:{ 
                id: user.id,
                email: user.email,
            },
            token: token,
        }
    });
    
};

const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "Logged out successfully" });
};

export { register, login, logout };