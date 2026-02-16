import mongoose from 'mongoose'
const ownerSchema = new mongoose.Schema(
	{
		address: {
			type: String,
			required: [true, 'Адреса має бути вказана'],
			trim: true,
		},
		fullName: {
			type: String,
			required: [true, 'Власник має бути вказаний'],
			trim: true,
		},
	},
	{ timestamps: true },
)
export default mongoose.model('Owner', ownerSchema)
