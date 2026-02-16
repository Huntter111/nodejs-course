// import Cars from '../models/CarModel.mjs'
import * as carService from '../services/carService.js'
import * as ownerService from '../services/ownerService.js'
import { deleteFileFromDir } from '../utils/utils.js'

export function carsValidationMiddleware(validationSchema) {
	return async (req, res, next) => {
		const result = validationSchema.safeParse(req.body) // якщо є помилки валідації

		// якщо result не успішний а є помилки, то виконуємо наступні дії
		if (!result.success) {
			let car = {}

			if (req.params.id) {
				car = await carService.getCarById(req.params.id)
			}
			const owners = await ownerService.getAllOwners()
			const ownerId = req.body.owner || car?.owner?._id?.toString() || car?.owner?.toString() || null
			return res.render('cars/carForm', {
				car: {
					...car,
					...req.body,
					_id: car?._id,
					photo: car?.photo,
				},
				owners,
				ownerId,
				errors: result.error.issues.map((err) => err.message),

				errorsByFiled: Object.fromEntries(result.error.issues.map((err) => [err.path[0], err.message])),
			})
		}
		//якщо не було помилок валідації
		req.validatedCarsData = result.data

		//переходимо до наступного обробника
		next()
	}
}
