const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
const cors = require("cors");
const askRoutes=require('./routes/askRoutes')
dotenv.config();


const app = express();
app.use(cors()); //actual link will be added later
app.use(express.json());
app.use(askRoutes);

const port = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_KEY;

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.listen(port, () => {
    console.log(`SERVER IS LIVE AND RUNNING AT :-> ${port}`);
});