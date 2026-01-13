import path from 'path' // path — для роботи з файловими шляхами
import { fileURLToPath } from 'url' // fileURLToPath — щоб перетворити import.meta.url у звичайний шлях

const __filename = fileURLToPath(import.meta.url) // Отримуємо абсолютний шлях до файлу settings.mjs.
const __dirname = path.dirname(__filename) // Отримуємо папку, в якій лежить settings.mjs
const filePath = path.join(__dirname, '/data/booksData.json') // __dirname — папка проєкту, /data/booksData.json — відносний шлях, разом отримуємо /.../hw-04-controllers-models/data/booksData.json

export default {
	dataPath: filePath,
}
