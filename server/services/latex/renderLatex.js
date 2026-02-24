import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

export function renderLatex(data) {
  const templatePath = path.resolve("templates/modern.hbs");
  const templateSource = fs.readFileSync(templatePath, "utf-8");

  const template = Handlebars.compile(templateSource);

  const tex = template(data);

  const outputPath = path.resolve("temp/resume.tex");

  if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");

  fs.writeFileSync(outputPath, tex);

  return outputPath;
}