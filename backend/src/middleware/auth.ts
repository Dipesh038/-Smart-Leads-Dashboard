import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/errors";
import { User } from "../models/User";

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
    User.findById(payload.sub)
      .select("name email role")
      .lean()
      .then((user) => {
        if (!user) {
          return next(new ApiError(401, "Unauthorized"));
        }

        req.user = {
          id: user._id.toString(),
          role: user.role,
          email: user.email,
          name: user.name
        };

        return next();
      })
      .catch(() => next(new ApiError(401, "Unauthorized")));
  } catch {
    return next(new ApiError(401, "Unauthorized"));
  }
};
