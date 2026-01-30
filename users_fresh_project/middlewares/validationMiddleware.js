export function userValidationMiddleware(validationSchema) {
	return (req, res, next) => {
		const result = validationSchema.safeParse(req.body)
		if (!result.success) {
			return res.status(400).render('register', {
				data: { ...req.body, id: req.params.id },
				errors: result.error.issues.map((err) => err.message),
			})
		}
		req.validatedUserData = result.data
		next()
	}
}
