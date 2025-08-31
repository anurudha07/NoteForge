import type{ Request, Response, NextFunction } from 'express';

export const notFound=(req: Request, res: Response, next: NextFunction)=> {
  res.status(404).json({ message: 'Not Found' });
}

export const errorHandler=(err: any, req: Request, res: Response, next: NextFunction) =>{
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
}
