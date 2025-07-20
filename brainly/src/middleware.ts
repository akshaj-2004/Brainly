import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "./config";

interface AuthPayLoad extends JwtPayload {
    id: string
}

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: "Authorization token missing or malformed" });
    }
    
     try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthPayLoad;
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
}