import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ContentModel, UserModel } from './db';
import './db';
import { JWT_SECRET } from './config';
import { UserMiddleware } from './middleware';


const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(411).json({
            message: "pls enter credentials"
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            username,
            password: hashedPassword
        });

        return res.status(201).json({ message: "User created successfully" });
    } catch (e: any) {
        console.error("Signup error:", e);
        if (e.code === 11000) {
            // duplicate key error from MongoDB
            return res.status(403).json({ message: "User already exists" });
        }
        return res.status(500).json({
            message: "Server error",
            error: e.message,
        });
    }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
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

        const token = jwt.sign({
            id: existingUser._id
        }, JWT_SECRET);

        return res.status(200).json({
            message: "Signin successful",
            token
        });
    } catch (e: any) {
        return res.status(500).json({ message: "Server error", error: e.message });
    }
});

app.post("/api/v1/content", UserMiddleware, (req, res) => {
    const { link, type } = req.body;
    ContentModel.create({
        
    })
});

app.get("/api/v1/content", (req, res) => {
    
});

app.delete("/api/v1/content", (req, res) => {
    // TODO: Implement this route
});

app.post("/api/v1/brain/share", (req, res) => {
    // TODO: Implement this route
});

app.get("/api/v1/brain/:shareLink", (req, res) => {
    // TODO: Implement this route
});

app.listen(3000, () => {
    console.log('app started');
});
