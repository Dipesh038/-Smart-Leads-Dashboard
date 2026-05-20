import bcrypt from "bcryptjs";
import { connectDb } from "./config/db";
import { env } from "./config/env";
import { User } from "./models/User";

const run = async () => {
  await connectDb();

  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || !env.ADMIN_NAME) {
    throw new Error("Missing admin seed variables");
  }

  const existing = await User.findOne({ email: env.ADMIN_EMAIL });
  if (existing) {
    console.log("Admin already exists");
    return process.exit(0);
  }

  const hashed = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
  await User.create({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    password: hashed,
    role: "admin"
  });

  console.log("Admin created");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
