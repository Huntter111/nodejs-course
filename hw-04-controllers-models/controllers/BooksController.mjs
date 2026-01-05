import Book from '../models/Book.mjs'

class BooksController {
	static books(req, res) {
		try {
			const { author = '', year = '' } = req.query

			const filters = {
				author: author.trim(),
				year: year.trim(),
			}

			const booksList = Book.loadBooksList(filters)

			res.render('books/bookList', {
				title: 'Books Page',
				books: booksList,
				filters, // щоб у формі зберігати введені значення
			})
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка завантаження даних',
				error,
			})
		}
	}

	static bookDetail(req, res) {
		try {
			const id = req.params.id
			const book = Book.getBookById(id)

			res.render('books/bookDetail', {
				title: 'Інформація про книгу',
				book,
			})
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при завантаженні інформації про книгу',
				error,
			})
		}
	}
	static getBookForm(req, res) {
		try {
			const book = req.params.id ? Book.getBookById(req.params.id) : {}
			res.render('books/bookForm', {
				book,
			})
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при створенні форми',
				error,
			})
		}
	}
	static createBook(req, res) {
		try {
			const bookData = req.body
			Book.addNewBook(bookData)
			res.redirect('/books')
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при відправці форми',
				error,
			})
		}
	}
	static updateBook(req, res) {
		try {
			const id = req.params.id
			Book.updateBook(id, req.body)
			res.redirect('/books')
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при оновлені книги',
				error,
			})
		}
	}
	static deleteBook(req, res) {
		try {
			Book.deleteBookById(req.body.id)
			res.status(204).end()
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при видалені',
				error,
			})
		}
	}
}

export default BooksController
