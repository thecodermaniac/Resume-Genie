const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const askRoutes = require("./routes/askRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const analysisRouter = require("./routes/analysisRoutes");
const userRoutes=require("./routes/UserRoutes")

dotenv.config();

const app = express();
app.use(cors()); //actual link will be added later
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(askRoutes);
app.use(uploadRoutes);
app.use(analysisRouter);
app.use(userRoutes)

const port = process.env.PORT || 3001;

const connectDB = async () => { 
  try { 
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // check
    console.log(`> MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`SERVER IS LIVE AND RUNNING AT :-> ${port}`);
});
