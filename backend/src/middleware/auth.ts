import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/errors";

type TokenPayload = {
  sub: string;
  role: "admin" | "sales";
  email: string;
  name: string;
};

const getToken = (req: Request) => {
  const header = req.headers.authorization;
  if (!header) return null;
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
};

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const token = getToken(req);
  if (!token) return next(new ApiError(401, "Unauthorized"));

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    req.user = {
      id: payload.sub,
      role: payload.role,
      email: payload.email,
      name: payload.name
    };
    return next();
  } catch {
    return next(new ApiError(401, "Unauthorized"));
  }
};
