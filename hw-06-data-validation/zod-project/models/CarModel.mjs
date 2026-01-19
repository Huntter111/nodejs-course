import DataFileManager from '../services/DataFileManager.mjs'

class Cars {
	static loadCarList() {
		return DataFileManager.loadData()
	}
	static addNewCar(carObj) {
		DataFileManager.addItem({ id: new Date().getTime(), ...carObj })
	}
	static getCarById(id) {
		return DataFileManager.getItemById(id)
	}
	static updateCar(id, carData) {
		DataFileManager.updateItemById(id, carData)
	}
	static deleteCarById(id) {
		DataFileManager.deleteItemById(id)
	}
}
export default Cars
