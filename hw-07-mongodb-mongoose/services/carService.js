import Car from '../models/Car.js'
export const getAllCars = async () => {
	return await Car.find()
}
export const getCarById = async (id) => {
	return await Car.findById(id)
}
export const createCar = async (carData) => {
	const car = new Car(carData)
	return await car.save()
}
export const updateCar = async (id, carData) => {
	return await Car.findByIdAndUpdate(id, carData, {
		new: true,
		runValidators: true,
	})
}
export const deleteCarById = async (id) => {
	return await Car.findByIdAndDelete(id)
}
