import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env")
});

console.log("ENV CHECK:", process.env.GROQ_API_KEY);

// Dynamic import AFTER dotenv.config() — ESM static imports are hoisted
// above all code, so modules would initialize before env vars are set.
const { app } = await import("./index.js");

// Local development server — Lambda uses lambda.js instead
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
