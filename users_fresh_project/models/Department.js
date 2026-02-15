import mongoose from 'mongoose'

const department = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Відділення обов'язкове"],
		minlength: [4, 'Довжина мінуму 4 символи!'],
		trim: [true],
	},
	score: {
		type: Number,
	},
})

export default mongoose.model('Department', department)
