import { Router } from 'express'
import path from 'node:path'

const router = Router()
router.get('/', (req, res) => {
	res.render('index', { title: 'Hello user!' })
})
router.get('/goals', (req, res) => {
	res.render('pages/goals', { title: 'Goals page', goal1: 'Купити молока', goal2: 'Виконати дз' })
})
router.get('/about', (req, res, next) => {
	const filePath = path.join(process.cwd(), 'public', 'html', 'about.html')

	res.sendFile(filePath, (err) => {
		if (err) return next(err)
	})
})
router.get('/news', (req, res, next) => {
	const filePath = path.join(process.cwd(), 'public', 'html', 'news.html')
	console.log('🚀 ~ filePath:', filePath)
	res.sendFile(filePath, (err) => {
		if (err) return next(err)
	})
})

router.get('/info/:myLinks', (req, res, next) => {
	const param = req.params.myLinks
	let route, data
	switch (param) {
		case 'sites':
			route = 'pages/sites'
			data = {
				title: 'Sites Page',
				site1: 'Google.com',
				site2: 'react.dev',
				site3: 'youtube.com',
			}
			break
		case 'films':
			route = 'pages/films'
			data = {
				title: 'Films Page ',
				film1: 'Oppenheimer',
				film2: 'Interstellar',
				film3: 'Expendables',
			}
			break
		case 'me':
			route = 'pages/me'
			data = {
				title: 'About me page',
				subTitle: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, voluptates.',
				paragraph:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ex distinctio blanditiis incidunt. Velit aperiam optio suscipit nam qui facere laudantium. Quasi, eius cumque. Nesciunt debitis rem at officia perspiciatis repellat incidunt accusantium earum esse praesentium inventore expedita repellendus corrupti suscipit eveniet illum optio, doloribus assumenda nihil cupiditate impedit asperiores.',
			}
			break
		default: {
			const err = new Error('Invalid info parametr')
			err.status = 404
			return next(err)
		}
	}

	res.render(`${route}`, data)
})
export default router
