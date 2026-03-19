import express from "express";
import cors from "cors";

import askRoutes from "./routes/askRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import { demoLimiter } from "./utils/rateLimiter.js";
import { globalErrorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalErrorHandler);
app.use(demoLimiter);

app.use("/uploads", express.static("uploads"));

app.use(askRoutes);
app.use(uploadRoutes);
app.use(analysisRoutes);
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ message: err.message });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Export app for Lambda handler (lambda.js) and local server (server.js)
export { app };
