import path from 'path' // path — для роботи з файловими шляхами
import { fileURLToPath } from 'url' // fileURLToPath — щоб перетворити import.meta.url у звичайний шлях

const __filename = fileURLToPath(import.meta.url) // Отримуємо абсолютний шлях до файлу settings.mjs.
export const __dirname = path.dirname(__filename) // Отримуємо папку, в якій лежить settings.mjs
const carsDataFilePath = path.join(__dirname, '/data/carsData.json') // __dirname — папка проєкту, /data/carsData.json

export default {
	carsFilePath: carsDataFilePath,
}
