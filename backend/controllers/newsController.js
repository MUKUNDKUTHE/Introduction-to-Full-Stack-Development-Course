import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllNews = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/staticNews.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const staticData = JSON.parse(data);
    res.json(staticData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
