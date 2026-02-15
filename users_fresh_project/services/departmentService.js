import Department from '../models/Department.js'

export const getAllDepartments = async () => {
	return await Department.find()
}
export const getDepartmentById = async (id) => {
	return await Department.findById(id)
}
export const createDepartment = async (departmentData) => {
	const department = new Department(departmentData)
	return await department.save()
}
export const updateDepartment = async (id, departmentData) => {
	return await Department.findByIdAndUpdate(id, departmentData, {
		new: true,
		runValidators: true,
	})
}
export const deleteDepartment = async (id) => {
	return await Department.findByIdAndDelete(id)
}
