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
				errorsByFiled: null,
				errors: null,
			})
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при створенні форми',
			})
		}
	}
	static createCar(req, res) {
		try {
			const carData = req.body
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
			const car = Cars.getCarById(id)

			const carData = { ...req.body }
			// Якщо користувач завантажив нове фото
			if (req.file) {
				// видаляємо старий файл тільки тоді, коли є новий
				if (car.photo) {
					deleteFileFromDir('uploads', car.photo)
				}
				carData.photo = req.file.filename
			} else {
				// якщо файл не вибрали - зберігаємо старе фото
				carData.photo = car.photo
			}

			Cars.updateCar(id, { ...carData, year: Number(carData.year) })
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
