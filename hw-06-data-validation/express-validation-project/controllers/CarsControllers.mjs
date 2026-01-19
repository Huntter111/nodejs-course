import { matchedData, validationResult } from 'express-validator'
import Cars from '../models/CarModel.mjs'
import { deleteFileFromDir } from '../utils/utils.js'

class CarsController {
	static cars(req, res) {
		try {
			const carList = Cars.loadCarList()

			res.render('cars/carList', {
				title: 'Cars Page',
				cars: carList,
			})
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка завантаження даних',
				error,
			})
		}
	}

	static carDetail(req, res) {
		try {
			const id = req.params.id
			const car = Cars.getCarById(id)

			res.render('cars/carDetail', {
				title: 'Інформація про машину',
				car,
			})
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при завантаженні інформації про автомобіль',
				error,
			})
		}
	}
	static getCarForm(req, res) {
		try {
			const car = req.params.id ? Cars.getCarById(req.params.id) : {}
			res.render('cars/carForm', {
				car,
				errorsByField: {},
				errors: null,
			})
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при створенні форми',
				error,
			})
		}
	}
	static createCar(req, res) {
		try {
			const errors = validationResult(req) // Отримуємо помилки за схемою валдіації
			if (!errors.isEmpty()) {
				if (req.file) {
					deleteFileFromDir('uploads', req.file.filename)
				}
				const errorsByField = {}

				for (const err of errors.array()) {
					if (!errorsByField[err.path]) errorsByField[err.path] = err.msg
				}

				return res.render('cars/carForm', {
					car: { ...req.body },
					errorsByField,
					errors: errors.array(),
				})
			}

			const carData = matchedData(req, { locations: ['body'] })
			if (req.file) {
				carData.photo = req.file.filename
			}
			Cars.addNewCar(carData)
			res.redirect('/cars')
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при відправці форми',
				error,
			})
		}
	}
	static updateCar(req, res) {
		try {
			const id = req.params.id
			const existingCar = Cars.getCarById(id) // беремо поточні дані авто (для merge і роботи з фото)
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				// якщо є помилки валідації — не зберігаємо зміни
				if (req.file) {
					// якщо файл щойно завантажений в uploads на цьому запит видаляємо щоб не смітити в uploads
					deleteFileFromDir('uploads', req.file.filename)
				}
				const errorsByField = {} // формуємо новий об'єкт з помилками за полями

				for (const err of errors.array()) {
					// групуємо першу помилку для кожного поля
					if (!errorsByField[err.path]) errorsByField[err.path] = err.msg
				}
				return res.render('cars/carForm', {
					car: { ...existingCar, ...req.body, id: existingCar.id, photo: existingCar.photo },
					errorsByField,
					errors: errors.array(),
				})
			}
			// беремо тільки валідовані/санітизовані значення з body
			const carData = matchedData(req, { locations: ['body'] })
			// Якщо користувач завантажив нове фото
			if (req.file) {
				// якщо є нове фото — видаляємо старе і зберігаємо нове
				if (existingCar.photo) {
					deleteFileFromDir('uploads', existingCar.photo)
				}
				carData.photo = req.file.filename
			} else {
				// якщо нове фото не завантажили — залишаємо попереднє
				carData.photo = existingCar.photo
			}

			Cars.updateCar(id, carData)
			res.redirect('/cars')
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при оновлені автомобіля',
				error,
			})
		}
	}
	static deleteCar(req, res) {
		try {
			const id = req.body.id
			const car = Cars.getCarById(id)
			if (car.photo) {
				deleteFileFromDir('uploads', car.photo)
			}
			Cars.deleteCarById(id)
			res.status(204).end()
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при видалені',
				error,
			})
		}
	}
}

export default CarsController
