import mongoose from 'mongoose'
const { Schema } = mongoose
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Ім"я не може бути порожнім'],
			minlength: [2, 'Довжина імені має бути принаймні 2 символи!'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Пошта обов"язкова!'],
			unique: true,
			match: [/^\S+@\S+\.\S+$/, 'Невірний формат!'],
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Пароль обов"язковий!'],
			minlength: [6, 'Довжина паролю має бути принаймні 6 символів!'],
			validate: [
				{
					validator: (v) => /[0-9]/.test(v),
					message: 'У паролі має бути принаймні одна цифра',
				},
				{
					validator: (v) => /[a-zA-Z]/.test(v),
					message: 'У паролі має бути принаймні одна літера',
				},
				{
					validator: (v) => /[^0-9a-zA-Z]/.test(v),
					message: 'У паролі має бути принаймні один спец-символ',
				},
			],
		},
		type: {
			type: Schema.Types.ObjectId,
			ref: 'Type',
		},

		department: {
			type: Schema.Types.ObjectId,
			ref: 'Department',
		},
	},
	{ timestamps: true },
)
export default mongoose.model('User', userSchema)
