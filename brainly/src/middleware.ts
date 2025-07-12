import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "./config";

interface AuthPayLoad extends JwtPayload {
    id: string
}

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token as string, JWT_SECRET) as AuthPayLoad
    if(decoded){
        req.userId = decoded.id
        next();
    }else{
        res.status(403).json({
            msg: "u are not logged in"
        })
    }
}