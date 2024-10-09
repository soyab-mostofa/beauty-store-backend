import express from "express";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
import cors from "cors";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
console.log("app running");

// Routes
app.use("/api/users", userRoutes);

export default app;
