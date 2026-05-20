import { Schema, model } from "mongoose";

export type UserRole = "admin" | "sales";

export type UserDoc = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "sales"], default: "sales" }
  },
  { timestamps: true }
);

export const User = model<UserDoc>("User", userSchema);
