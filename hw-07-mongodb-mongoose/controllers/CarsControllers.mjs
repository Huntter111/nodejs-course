import { deleteFileFromDir, moveFile } from '../utils/utils.js'
import * as carService from '../services/carService.js'
import fs from 'fs'
import path from 'path'

class CarsController {
	static async carList(req, res) {
		try {
			const carList = await carService.getAllCars()

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

	static async carDetail(req, res) {
		try {
			const id = req.params.id
			const car = await carService.getCarById(id)

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
	static async getCarForm(req, res) {
		try {
			const car = req.params.id ? await carService.getCarById(req.params.id) : {}
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
	static async registerCar(req, res) {
		try {
			const carData = { ...req.body }

			if (req.file) {
				const tmpPath = req.file.path
				const finalPath = path.join('uploads', req.file.filename)

				moveFile(tmpPath, finalPath)
				carData.photo = req.file.filename
			}

			await carService.createCar(carData)
			res.redirect('/cars')
		} catch (error) {
			// cleanup tmp
			if (req.file?.path) {
				fs.unlink(req.file.path, () => {})
			}

			res.status(500).render('error', {
				message: 'Помилка при створенні автомобіля',
				error,
			})
		}
	}
	static async updateCar(req, res) {
		try {
			const id = req.params.id
			const car = await carService.getCarById(id)

			const carData = { ...req.body, year: Number(req.body.year) }

			// Якщо існує фото
			if (req.file) {
				const tmpPath = req.file.path
				const finalPath = path.join('uploads', req.file.filename)

				// 👉 переносимо ТІЛЬКИ ТУТ
				moveFile(tmpPath, finalPath)

				// видаляємо старе фото
				if (car.photo) {
					deleteFileFromDir('uploads', car.photo)
				}

				carData.photo = req.file.filename
			} else {
				carData.photo = car.photo
			}

			await carService.updateCar(id, carData)
			res.redirect('/cars')
		} catch (error) {
			// cleanup tmp if error
			if (req.file?.path) {
				fs.unlink(req.file.path, () => {})
			}
			res.status(500).render('error', {
				message: 'Помилка при оновлені автомобіля',
				error,
			})
		}
	}
	static async deleteCar(req, res) {
		try {
			const id = req.params.id

			const car = await carService.deleteCarById(id)

			if (car?.photo) {
				deleteFileFromDir('uploads', car.photo)
			}

			res.status(204).end()
		} catch (error) {
			res.status(500).render('error', {
				message: 'Помилка при видаленні',
				error,
			})
		}
	}
}

export default CarsController
