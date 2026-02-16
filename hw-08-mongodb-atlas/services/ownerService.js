import Owner from '../models/CarOwner.js'

export const getAllOwners = async () => {
	return await Owner.find()
}
export const getOwnerById = async (id) => {
	return await Owner.findById(id)
}
export const createOwner = async (ownerData) => {
	const owner = new Owner(ownerData)
	return await owner.save()
}
export const updateOwner = async (id, ownerData) => {
	return await Owner.findByIdAndUpdate(id, ownerData, {
		new: true,
		runValidators: true,
	})
}
export const deleteOwnerById = async (id) => {
	return await Owner.findByIdAndDelete(id)
}
