import { Router } from 'express'

const router = Router()
router.get('/', (req, res) => {
	res.render('index', { title: 'Express' })
})
router.get('/coffee', (req, res) => {
	res.render('pages/coffee', { title: 'Coffee' })
})
router.get('/music', (req, res) => {
	res.render('pages/music', { title: 'Music' })
})
export default router
