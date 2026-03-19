import multer from "multer";
import path from "path";
import { existsSync, mkdirSync } from "fs";

// Use /tmp on Lambda (only writable dir); keep relative path for local dev
const UPLOAD_DIR = process.env.AWS_LAMBDA_FUNCTION_NAME
  ? "/tmp/pdfUploads"
  : "pdfUploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!existsSync(UPLOAD_DIR)) {
      mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const pdfUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  }
});
