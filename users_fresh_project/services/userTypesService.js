import UserType from '../models/UserType.js'

export const getAllTypes = async () => {
	return await UserType.find()
}
export const getTypeById = async (id) => {
	return await UserType.findById(id)
}
export const createType = async (typeData) => {
	const userType = new UserType(typeData)
	return await userType.save()
}
export const updateUserType = async (id, typeData) => {
	return await UserType.findByIdAndUpdate(id, typeData, {
		new: true,
		runValidators: true,
	})
}
export const deleteUserType = async (id) => {
	return await UserType.findByIdAndDelete(id)
}
