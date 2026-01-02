import { Router } from 'express'
import { getCurrentDay, getCurrentMonth } from './utils.mjs'

const router = Router()
router.get('/', (req, res) => {
	res.render('index', { title: 'Express' })
})
router.get('/day', (req, res) => {
	const currentDay = new Date().getDay()
	const day = getCurrentDay(currentDay)
	const nextDay = getCurrentDay(currentDay + 1)
	res.render('day', { title: day, subTitle: nextDay === 6 || nextDay === 7 ? 'вихідний' : 'робочий' })
})
router.get('/month', (req, res) => {
	const currentMonth = new Date().getMonth() + 1
	const month = getCurrentMonth(currentMonth)
	const nextMonth = getCurrentMonth(((currentMonth - 1 + 1) % 12) + 1)

	res.render('month', { title: month, subTitle: nextMonth })
})
router.get('/time', (req, res) => {
	const currentTime = new Date().getHours()
	let resultTimeOfDay = ''
	if (currentTime >= 5 && currentTime <= 12) resultTimeOfDay = 'Ранок'
	else if (currentTime >= 12 && currentTime <= 15) resultTimeOfDay = 'Обід'
	else if (currentTime >= 18 && currentTime <= 22) resultTimeOfDay = 'Вечеря'
	else resultTimeOfDay = 'Ніч або невизначений час'
	res.render('time', { title: resultTimeOfDay })
})
export default router
