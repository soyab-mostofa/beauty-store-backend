import { z } from "zod";
import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import { generateToken } from "../utils/jwtUtils";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create a new user
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    const token = generateToken(newUser);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  // Check if password matches
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400).json({ message: "Incorrect password" });
    return;
  }

  // Generate a token
  const token = generateToken(user);

  res.status(200).json({ message: "Login successful", token });
};
