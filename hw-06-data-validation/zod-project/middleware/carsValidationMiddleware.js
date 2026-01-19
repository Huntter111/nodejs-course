import Cars from '../models/CarModel.mjs'
import { deleteFileFromDir } from '../utils/utils.js'

export function carsValidationMiddleware(validationSchema) {
	return (req, res, next) => {
		const result = validationSchema.safeParse(req.body) // якщо є помилки валідації

		// якщо result не успішний а є помилки, то виконуємо наступні дії
		if (!result.success) {
			if (!req.params.id && req.file) {
				// Якщо в параметрах запиту є id і є фото то видаляємо це фото
				deleteFileFromDir('uploads', req.file.filename)
			}
			const issuesArr = result.error.issues // отримуємо масив об'єктів до кожного поля
			const errorsByFiled = {}
			for (const err of issuesArr) {
				const field = err.path[0]
				if (!errorsByFiled[field]) errorsByFiled[field] = err.message // формуємо новий об'єкт з ключ:значення з name поля і помилкою до нього
			}

			const dbCar = req.params.id ? Cars.getCarById(req.params.id) : null
			const carViewMode = dbCar ? { ...dbCar, ...req.body } : { ...req.body }

			return res.render('cars/carForm', {
				car: carViewMode,
				errors: result.error.issues.map((err) => err.message),
				errorsByFiled,
			})
		}
		//якщо не було помилок валідації
		req.validatedCarsData = result.data

		//переходимо до наступного обробника
		next()
	}
}
