import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // так как в модулях эти константы не определены - определяем их сами
console.log(__filename);
console.log(__dirname);
