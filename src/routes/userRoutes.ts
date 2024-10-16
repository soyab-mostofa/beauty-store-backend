import { Router, Request, Response } from "express";
import { registerUser, loginUser } from "../controller/userController";

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);

export default router;
