import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import z from "zod";
import {
  BadRequest,
  Conflict,
  HttpError,
  NotFound,
  Unauthorized,
} from "../middleware/errorHandler.js";
import { User } from "../models/User.js";
import { comparePassword, hashPassword } from "../lib/passwordHandler.js";
import { createToken } from "../lib/tokenHandler.js";

const signupSchema = z.object({
  username: z
    .string("Username must be provided.")
    .min(4, "Minimum 4 characters."),
  password: z
    .string("Password must be provided.")
    .min(6, "Minimun 6 characters."),
  email: z.email("Email must be provided."),
});

const loginSchema = z.object({
  username: z
    .string("Username must be provided.")
    .min(4, "Minimum 4 characters."),
  password: z
    .string("Password must be provided.")
    .min(6, "Minimun 6 characters."),
});

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    throw BadRequest(result.error.issues[0]?.message ?? "Invalid data.");
  }

  const { email, password, username } = result.data;

  const existingEmail = await User.exists({ email: email });
  if (existingEmail) {
    throw Conflict("Email already exist.");
  }

  const existingUsername = await User.exists({ username: username });
  if (existingUsername) {
    throw Conflict("Username already exist.");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    username,
    password: hashedPassword,
    email,
  });

  if (!newUser) {
    throw new HttpError("Internal error.", 500);
  }

  const token = createToken(newUser._id.toString());
  res.cookie("smartLink", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({
    user: {
      username: newUser.username,
      email: newUser.email,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw BadRequest(result.error.issues[0]?.message ?? "Invalid data.");
  }

  const { username, password } = result.data;

  const user = await User.findOne({ username: username });
  if (!user) {
    throw NotFound("User does not exist.");
  }

  const correctPassword = await comparePassword(password, user.password);
  if (!correctPassword) {
    throw Unauthorized("Password incorrect.");
  }

  const token = createToken(user._id.toString());
  res.cookie("smartLink", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({
    user: {
      username: user.username,
      email: user.email,
    },
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("smartLink");
  res.json({ success: true });
});
