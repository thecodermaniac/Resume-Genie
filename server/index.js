const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
const askRoutes = require('./routes/askRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

dotenv.config();



const app = express();
app.use(cors()); //actual link will be added later
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(askRoutes);
app.use(uploadRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`SERVER IS LIVE AND RUNNING AT :-> ${port}`);
});