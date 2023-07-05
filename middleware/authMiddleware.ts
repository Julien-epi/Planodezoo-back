import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

interface DecodedToken {
  userId?: string;
  role?: string;
}

// Extend the Request interface
declare module "express" {
  export interface Request {
    userId?: string;
    userRole?: string;
  }
}

export class AuthMiddleware {
  public static isDecodedToken(object: any): object is DecodedToken {
    return object && (object.userId !== undefined || object.role !== undefined);
  }

  public validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      console.log("Token error");
      return res.status(401).json({ message: "Token error" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      console.log("Token malformatted");
      return res.status(401).json({ message: "Token malformatted" });
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            console.log('Token verification error:', err);
            return res.status(401).json({ message: "Token invalid" });
        }

        if (AuthMiddleware.isDecodedToken(decoded)) {
            req.userId = decoded.userId;
            req.userRole = decoded.role;
            console.log("Decoded userId: ", decoded.userId);
            console.log("Decoded role: ", decoded.role);
            next();
          } else {
            console.log("Token invalid: decoded token is not as expected");
            return res.status(401).json({ message: 'Token invalid' });
          }
      }
    );
  }

  public isRole(role: string) {
    return (
      req: Request,
      res: Response,
      next: NextFunction
    ): Response | void => {
      // Check if user role is as expected
      if (req.userRole !== role) {
          console.log("Unexpected user role: ", req.userRole);
          console.log("Expected role: ", role);
        return res.status(403).json({
          message: `You are not authorized to perform this action, required role: ${role}`,
        });
      }

      return next();
    };
  }
}
