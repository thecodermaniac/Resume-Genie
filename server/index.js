const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
const askRoutes=require('./routes/askRoutes')
dotenv.config();


const app = express();
app.use(cors()); //actual link will be added later
app.use(express.json());
app.use(askRoutes);


const port = process.env.PORT || 5000;




app.listen(port, () => {
    console.log(`SERVER IS LIVE AND RUNNING AT :-> ${port}`);
});