import express from 'express'
import UserController from '../controllers/userController.mjs'
import { userValidationMiddleware } from '../middlewares/validationMiddleware.js'
import { UserValidationSchema } from '../validation/user.schema.js'

const router = express.Router()
router.get('/', UserController.usersList)
router.get('/register/:id?', UserController.registerForm)
router.post('/register/:id?', userValidationMiddleware(UserValidationSchema), UserController.registerUser)
router.delete('/:id?', UserController.deleteUser)
export default router
