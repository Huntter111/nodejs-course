import DataFileManager from '../services/DataFileManager.mjs'

class Cars {
	static loadCarList() {
		return DataFileManager.loadData()
	}
	static addNewCar(carObj) {
		const normilizedCarData = { ...carObj, year: carObj.year ? Number(carObj.year) : undefined }
		DataFileManager.addItem({
			id: new Date().getTime(),
			...normilizedCarData,
		})
	}
	static getCarById(id) {
		return DataFileManager.getItemById(id)
	}
	static updateCar(id, carData) {
		const normilizedCarData = { ...carData, year: carData.year ? Number(carData.year) : undefined }

		DataFileManager.updateItemById(id, normilizedCarData)
	}
	static deleteCarById(id) {
		DataFileManager.deleteItemById(id)
	}
}
export default Cars
