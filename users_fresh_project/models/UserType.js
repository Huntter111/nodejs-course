import mongoose from 'mongoose'

const userType = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Тип обов'язковий"],
		minlength: [4, 'Довжина мінуму 4 символи!'],
		trim: [true],
	},
})

export default mongoose.model('Type', userType)
