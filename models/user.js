import mongoose from "mongoose";
import { createHmac, randomBytes } from "node:crypto";
import { createTokenForUser } from "../services/authentication.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/user-circles-set_78370-4704.avif",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
 
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");
  
  const salt = user.salt
  const hashedPassword = user.password

  const userProvidedHash = createHmac("sha256", salt)
    .update(password) 
    .digest("hex");

  if (userProvidedHash !== hashedPassword) {
    throw new Error("Incorrect password");
  }

  const token = createTokenForUser(user)
  return token
});

const User = mongoose.model("user", userSchema);

export default User;