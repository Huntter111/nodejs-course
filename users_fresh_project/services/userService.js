import User from '../models/User.js'

export const getAllUsers = async () => {
	return await User.find().populate('type').populate('department')
}
export const getUserById = async (id) => {
	return await User.findById(id)
}
export const createUser = async (userData) => {
	const user = new User(userData)
	return await user.save()
}
export const updateUser = async (id, userData) => {
	return await User.findByIdAndUpdate(id, userData, {
		new: true,
		runValidators: true,
	})
}
export const deleteUser = async (id) => {
	return await User.findByIdAndDelete(id)
}
