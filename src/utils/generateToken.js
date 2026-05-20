import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    const payload = {
        id: userId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || "7d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * (1000 * 60 * 60 * 24),
    });

    return token;
};

export default generateToken;