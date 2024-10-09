import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { registerUser } from "../controller/userController";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json({ success: true });
});

router.post("/", registerUser);

export default router;
