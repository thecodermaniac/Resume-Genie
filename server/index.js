import express, { json } from "express";
import { connect } from "mongoose";
import env from "dotenv";
import cors from "cors";
import askRoutes from "./routes/askRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import analysisRouter from "./routes/analysisRoutes.js";
env.config();

const app = express();
app.use(cors()); //actual link will be added later
app.use(json());
app.use("/uploads", express.static("uploads"));
app.use(askRoutes);
app.use(uploadRoutes);
app.use(analysisRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`SERVER IS LIVE AND RUNNING AT :-> ${port}`);
});
