import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../db";
import { JWT_SECRET } from "../config";

const router = Router();

router.post("/api/v1/signup", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(411).json({ message: "Please enter credentials" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        await UserModel.create({ username, password: hashedPassword });
        return res.status(201).json({ message: "User created successfully" });
    } catch (e: any) {
        console.error("Signup error:", e);
        if (e.code === 11000) {
            return res.status(403).json({ message: "User already exists" });
        }
        return res.status(500).json({ message: "Server error", error: e.message });
    }
});

router.post("/api/v1/signin", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(411).json({ message: "Please enter credentials" });
    }

    try {
        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);

        return res.status(200).json({
            message: "Signin successful",
            token,
        });
    } catch (e: any) {
        return res.status(500).json({ message: "Server error", error: e.message });
    }
});

export default router;
