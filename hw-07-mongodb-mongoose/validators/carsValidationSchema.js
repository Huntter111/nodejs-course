import * as z from 'zod'
const currentYear = new Date().getFullYear()
export const carsValidationSchema = z.object({
	brand: z
		.string()
		.nonempty({ message: 'Вкажіть бренд' })
		.min(2, { message: 'Бренд має бути мінімум з 2-х символів' })
		.trim(),
	plate: z
		.string()
		.trim()
		.min(1, { message: 'Вкажіть номер авто' })
		.regex(/^[\p{L}\p{N}]+$/u, {
			message: 'Номер може містити лише літери та цифри',
		}),
	year: z.coerce
		.number()
		.min(4, { message: 'Вкажіть коректний рік' })
		.gte(1900, { message: 'Рік має бути не менше 1900' })
		.lte(currentYear, { message: `Рік має бути не більше ${currentYear}` }),
	description: z.string().trim().optional(),
})
// brand
// plate
// year
// description
// photo
