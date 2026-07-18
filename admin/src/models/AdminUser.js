// Mongoose model for an admin who can sign into /admin-login.
// Passwords are stored only as bcrypt hashes, never in plain text.

import mongoose from "mongoose";

const { Schema } = mongoose;

const AdminUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true, collection: "admin_users" }
);

export default mongoose.models.AdminUser ||
  mongoose.model("AdminUser", AdminUserSchema);
