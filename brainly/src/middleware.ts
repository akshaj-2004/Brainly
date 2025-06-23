import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config";

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token as string, JWT_SECRET) 
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id
        next();
    }else{
        res.status(403).json({
            msg: "u are not logged in"
        })
    }

}