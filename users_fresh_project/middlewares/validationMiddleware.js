import * as userTypesService from '../services/userTypesService.js'
import * as departmentService from '../services/departmentService.js'

export function userValidationMiddleware(validationSchema) {
	return async (req, res, next) => {
		const result = validationSchema.safeParse(req.body)
		if (!result.success) {
			const typesList = await userTypesService.getAllTypes()
			const departmentsList = await departmentService.getAllDepartments()
			return res.status(400).render('register', {
				data: { ...req.body, id: req.params.id },
				errors: result.error.issues.map((err) => err.message),
				typesList,
				departmentsList,
			})
		}
		req.validatedUserData = result.data
		next()
	}
}
