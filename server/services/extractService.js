const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");

exports.extractTextFromFile = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === ".pdf") {
    const pdfParse = require("pdf-parse");
    const buffer = fs.readFileSync(file.path);
    const data = await pdfParse(buffer);
    return data.text || "";
  }

  if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    const { data: { text } } = await Tesseract.recognize(file.path, "eng");
    return text || "";
  }

  return "";
};