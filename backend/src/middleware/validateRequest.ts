import type{ Request, Response, NextFunction } from 'express';

export const requireFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missing: string[] = [];
    for (const f of fields) {
      if (req.body[f] === undefined || req.body[f] === null || (typeof req.body[f] === 'string' && req.body[f].trim() === '')) {
        missing.push(f);
      }
    }
    if (missing.length) {
      return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
    }
    next();
  };
};
