import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./config/env";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => {
    res.status(200).json({ success: true, message: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/leads", leadRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
