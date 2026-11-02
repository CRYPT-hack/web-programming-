import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "API is running" }));

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

export default app;
