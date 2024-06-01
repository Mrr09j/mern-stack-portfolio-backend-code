import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "name required"],
  },
  email: {
    type: String,
    required: [true, "email required"],
  },
  phone: {
    type: String,
    required: [true, "phone required"],
  },
  aboutMe: {
    type: String,
    required: [true, "about me field  required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "password must be of 8 letters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, "url is required"],
  },
  githubURL: String,
  instagramURL: String,
  twitterURL: String,
  linkedInURL: String,
  facebookURL: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//for comparing password with hash password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generating jsonwebtoken
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  console.log(resetToken);
  console.log(this.resetPasswordToken);
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
