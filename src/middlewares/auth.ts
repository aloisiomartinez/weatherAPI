import AuthService from "@src/services/auth";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['x-access-token'];
  const decoded = AuthService.decodeToken(token as string);
  req.decoded = decoded;
}