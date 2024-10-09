import express from "express";
import authRoutes from "./routes/authRoutes";
import connectDB from "./config/db";
import cors from "cors";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;
