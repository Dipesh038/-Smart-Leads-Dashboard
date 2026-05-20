import { createApp } from "./app";
import { connectDb } from "./config/db";
import { env } from "./config/env";

const start = async () => {
  await connectDb();
  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`API running on ${env.PORT}`);
  });
};

start();
