import { body } from 'express-validator'

const currentYear = new Date().getFullYear()
class CarsValidator {
	// Validation chain
	static CarsValidatorRules = [
		body('brand')
			.notEmpty()
			.withMessage('Вкажіть марку авто')
			.isLength({ min: 2 })
			.withMessage('Довжина бренда має бути більша за 2 символи')
			.trim()
			.escape(),

		body('plate')
			.notEmpty()
			.withMessage('Номер авто має бути вказаний')
			.isAlphanumeric() // чи містить значення тільки букви та цифри
			.withMessage('Номер авто має місти букви або цифри')
			.trim()
			.escape(),
		body('year')
			.notEmpty()
			.withMessage('Рік має бути вказаний')
			.matches(/^\d{4}$/)
			.withMessage('Рік має бути чотиризначним')
			.isInt({ min: 1900, max: currentYear })
			.withMessage(`Роки з 1900 по ${currentYear}`)
			.trim(),
		body('description').trim().escape(),
	]
	static CarsValidatorSchema = {
		brand: {
			notEmpty: {
				errorMessage: 'Вкажіть марку авто',
			},
			isLength: {
				options: { min: 2 },
				errorMessage: 'Довжина бренда має бути більша за 2 символи',
			},
			trim: true,
			escape: true,
		},
		plate: {
			notEmpty: {
				errorMessage: 'Вкажіть номер авто',
			},
			isAlphanumeric: {
				errorMessage: 'Номер авто має місти букви або цифри',
			},
			trim: true,
			escape: true,
		},
		year: {
			notEmpty: {
				errorMessage: 'Рік має бути вказаний',
			},
			matches: {
				options: /^\d{4}$/,
				errorMessage: 'Рік має бути чотиризначним',
			},
			isInt: {
				options: { min: 1900, max: currentYear },
				errorMessage: `Роки з 1900 по ${currentYear}`,
			},
			trim: true,
		},
		description: {
			trim: true,
			escape: true,
		},
	}
}
export default CarsValidator
// brand
// plate
// year
// description
// photo
