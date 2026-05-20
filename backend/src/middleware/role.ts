import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors";

export const requireRole = (...roles: Array<"admin" | "sales">) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (!roles.includes(req.user.role)) return next(new ApiError(403, "Forbidden"));
    return next();
  };
};
