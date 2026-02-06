import mongoose from 'mongoose'
const carSchema = new mongoose.Schema(
	{
		brand: {
			type: String,
			required: [true, 'Ім"я не може бути порожнім'],
			minlength: [2, 'Довжина імені має бути принаймні 2 символи!'],
			trim: true,
		},
		year: {
			type: Number,
			required: [true, "Рік обов'язковий!"],
			trim: true,
		},
		plate: {
			type: String,
			required: [true, 'Ім"я не може бути порожнім'],
			minlength: [2, 'Довжина імені має бути принаймні 2 символи!'],
			trim: true,
		},
		description: {
			type: String,
			minlength: [2, 'Довжина імені має бути принаймні 2 символи!'],
			trim: true,
		},
		photo: {
			type: String,
		},
	},
	{ timestamps: true },
)
export default mongoose.model('Car', carSchema)
