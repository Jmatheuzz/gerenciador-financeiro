import { NextFunction, Request, Response } from "express";

class AuthenticateMiddleware {
  authenticate(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
  }
}
export const authenticateMiddleware = new AuthenticateMiddleware().authenticate