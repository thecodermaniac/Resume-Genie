import multer from "multer";
import path from "path";
import { existsSync, mkdirSync } from "fs";

const PDF_MIME_TYPES = ["application/pdf"];

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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const isPdfMime = PDF_MIME_TYPES.includes(file.mimetype);
    const isPdfExt = path.extname(file.originalname).toLowerCase() === ".pdf";

    if (!isPdfMime || !isPdfExt) {
      return cb(
        new Error("Only PDF files are allowed"),
        false
      );
    }

    cb(null, true);
  }
});
