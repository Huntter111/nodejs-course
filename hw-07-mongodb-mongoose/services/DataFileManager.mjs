import fs from 'fs'
import settings from '../settings.mjs'

class DataFileManger {
	constructor(filePath) {
		this.filePath = filePath
	}

	// === Метод збереження цілого переданого через параметри масиву
	saveData(dataArray) {
		try {
			fs.writeFileSync(this.filePath, JSON.stringify(dataArray), 'utf8')
		} catch (error) {
			throw new Error(`Помилка при збереженні даних: ${error.message}`)
		}
	}
	// === Метод зчитування усього масиву з файлу
	loadData() {
		try {
			console.log('Load data ---------------- this.filePath')
			console.log(this.filePath)
			const data = fs.readFileSync(this.filePath, 'utf8')
			return JSON.parse(data)
		} catch (error) {
			if (error.code === 'ENOENT') {
				this.saveData([])
				return []
			} else {
				throw new Error(`Помилка при зчитуванні даних: ${error.message}`)
			}
		}
	}
	// === Метод додавання нового об'єкта
	addItem(item) {
		try {
			const data = this.loadData() // отримуємо дані
			if (!item) {
				throw new Error(`Об'єкт не передано`)
			}
			data.push(item) // пушимо об'єкт в кінець масиву з даними
			this.saveData(data) // зберігаємо оновлений масив даних
		} catch (error) {
			throw new Error(`Помилка при додаванні `)
		}
	}
	// === Метод зчитування з файлу і повернення об'єкта
	getItemById(id) {
		try {
			const data = this.loadData()
			const item = data.find((item) => item.id == id)
			if (!item) {
				throw new Error(`Об'єкт з ${id} не знайдено`)
			}
			return item
		} catch (error) {
			throw new Error(`Помилка при пошуку об'єкта ${error.message}`)
		}
	}
	// === Метод оновлення у файлі даних про об'єкт з заданим id
	updateItemById(id, updateProperties) {
		try {
			const data = this.loadData()
			const index = data.findIndex((item) => item.id == id)
			if (index !== -1) {
				data[index] = { ...data[index], ...updateProperties }
				this.saveData(data)
				return true
			} else {
				throw new Error(`Об'єкт з id ${id} не знайдено`)
			}
		} catch (error) {
			throw new Error(`Не вдалось оновити дані об'єкта ${error.message}`)
		}
	}
	// === Метод видалення об'єкта у файлі з заданим id
	deleteItemById(id) {
		try {
			const data = this.loadData()
			const newData = data.filter((item) => item.id != id)
			if (newData.length === data.length) {
				throw new Error(`Об'єкт з id ${id} не знайдено`)
			}
			this.saveData(newData)
		} catch (error) {
			throw new Error(`Сталася помилка при видаленні об'єкта ${error.message}`)
		}
	}
}

export default new DataFileManger(settings.carsFilePath)
