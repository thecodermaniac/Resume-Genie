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
app.use(globalErrorHandler);
app.use(demoLimiter);

app.use("/uploads", express.static("uploads"));

app.use(askRoutes);
app.use(uploadRoutes);
app.use(analysisRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
