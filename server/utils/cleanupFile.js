import { unlinkSync, existsSync } from "fs";

export function cleanupFile(filePath) {
  if (existsSync(filePath)) {
    unlinkSync(filePath);
  }
}
