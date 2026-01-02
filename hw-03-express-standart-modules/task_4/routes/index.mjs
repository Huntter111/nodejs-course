import { Router } from 'express'
import path from 'node:path'
import products from '../data/products.mjs'
const router = Router()
router.get('/', (req, res) => {
	res.render('index', { title: 'Головна сторінка' })
})
router.get('/about', (req, res, next) => {
	const filePath = path.join(process.cwd(), 'public', 'html', 'about.html')
	res.sendFile(filePath, (err) => {
		if (err) return next(err)
	})
})
router.get('/products', (req, res) => {
	res.render('products/product', { title: 'Product page', products })
})

router.get('/products/add', (req, res) => {
	res.render('products/addProduct', { title: 'Add Product Page' })
})
export default router
