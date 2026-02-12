import multer from "multer";
import path from "path";
import { existsSync, mkdirSync } from "fs";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!existsSync("pdfUploads")) {
      mkdirSync("pdfUploads");
    }
    cb(null, "pdfUploads");
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
