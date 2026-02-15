import z from 'zod'
export const UserValidationSchema = z.object({
	name: z.string().nonempty({ message: 'Ім"я не може бути порожнім' }).min(2, { message: 'Довжина імені має бути принаймні 2 символи!' }),
	email: z.string().nonempty({ message: 'Пошта обов"язкова!' }).email({ message: 'Невірний формат!' }),
	password: z
		.string()
		.nonempty({ message: 'Пароль обов"язковий!' })
		.min(6, { message: 'Довжина паролю має бути принаймні 6 символів!' })

		.regex(/[0-9]/, { message: 'У паролі має бути принаймні одна цифра' })
		.regex(/[a-zA-Z]/, { message: 'У паролі має бути принаймні одна літера' })
		.regex(/[^0-9a-zA-Z]/, {
			message: 'У паролі має бути принаймні один спец-символ',
		}),
	type: z.string().nonempty({ message: "Тип є об'язковим" }),
	department: z.string().nonempty({ message: "Відділ є обов'язковим" }),
})
