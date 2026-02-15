import * as userService from '../services/userService.js'
import * as userTypesService from '../services/userTypesService.js'
import * as departmentService from '../services/departmentService.js'

class UserController {
	static async usersList(req, res) {
		try {
			const users = await userService.getAllUsers()
			res.render('users/userList', { users })
		} catch (error) {
			res.status(500).send('Помилка отримання користувачів')
		}
	}
	static async registerForm(req, res) {
		const id = req.params.id
		let user = null
		if (id) {
			try {
				user = await userService.getUserById(id)
			} catch (error) {
				user = null
			}
		}
		const typesList = await userTypesService.getAllTypes()
		const departmentsList = await departmentService.getAllDepartments()
		res.render('register', {
			data: user,
			typesList,
			departmentsList,
			errors: null,
		})
	}
	static async registerUser(req, res) {
		const { email, password, name, type, department } = req.validatedUserData
		try {
			if (req.params.id) {
				await userService.updateUser(req.params.id, { email, password, name, type, department })
			} else {
				await userService.createUser({ email, password, name, type, department })
			}
			res.redirect('/users')
		} catch (error) {
			res.status(500).send({ error })
		}
	}
	static async deleteUser(req, res) {
		try {
			await userService.deleteUser(req.params.id)
			res.json({ success: true })
		} catch (error) {
			res.status(500).json({ success: false, message: 'Failed to delete user' })
		}
	}
}
export default UserController
