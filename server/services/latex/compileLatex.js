import { exec } from "child_process";
import path from "path";

export function compileLatex(texPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(texPath);

    exec(
      `pdflatex -interaction=nonstopmode -output-directory=${dir} ${texPath}`,
      (err) => {
        if (err) return reject(err);

        resolve(path.join(dir, "resume.pdf"));
      }
    );
  });
}