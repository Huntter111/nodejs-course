import Book from '../models/Book.mjs'

class MainController {
	static mainPage(req, res) {
		res.render('index', { title: 'Book Manager App' })
	}
	static aboutPage(req, res) {
		const booksList = Book.loadBooksList()
		const totalBooks = booksList.length
		const oldestBook = booksList.reduce((oldest, book) => {
			if (!oldest) return book
			return Number(book.year) < Number(oldest.year) ? book : oldest
		}, null)
		res.render('about', {
			title: 'About page',
			totalBooks,
			oldestBook,
		})
	}
	static contactsPage(req, res) {
		res.render('contacts', { title: 'Contacts page' })
	}
}

export default MainController
