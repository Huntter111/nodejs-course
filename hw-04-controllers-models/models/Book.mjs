import DataFileManager from '../services/DataFileManager.mjs'

class Book {
	static loadBooksList(filters = {}) {
		let books = DataFileManager.loadData()

		const author = (filters.author ?? '').toLowerCase()
		const year = filters.year ?? ''

		if (author) {
			books = books.filter((b) =>
				String(b.author ?? '')
					.toLowerCase()
					.includes(author),
			)
		}
		if (year) {
			const y = Number(year)
			books = books.filter((b) => Number(b.year) === y)
		}
		return books
	}
	static addNewBook(bookObj) {
		DataFileManager.addItem({ id: new Date().getTime(), ...bookObj })
	}
	static getBookById(id) {
		return DataFileManager.getItemById(id)
	}
	static updateBook(id, bookData) {
		DataFileManager.updateItemById(id, bookData)
	}
	static deleteBookById(id) {
		DataFileManager.deleteItemById(id)
	}
}
export default Book
