import { Router } from 'express'
import BooksController from '../controllers/BooksController.mjs'

const router = Router()
router.get('/', BooksController.books)
router.get('/create', BooksController.getBookForm) // відкриє сторінку форми
router.get('/update/:id', BooksController.getBookForm)
router.get('/:id', BooksController.bookDetail)

router.post('/update/:id', BooksController.updateBook)
router.post('/create', BooksController.createBook) // на сторінці форми при заповнені полів вводу і натисненні на кнопку Зберегти додасть книгу в масив

router.delete('/', BooksController.deleteBook)
export default router
