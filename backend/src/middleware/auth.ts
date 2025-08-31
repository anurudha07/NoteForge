import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export interface AuthRequest extends Request {
  userId?: string;
}


export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing auth header' });
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }
  try {
    const secret = process.env.JWT_SECRET || 'secret';
    if (!secret) {
      throw new Error("JWT_SECRET not set in environment");
    }
    const payload = jwt.verify(token, secret) as any;
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};