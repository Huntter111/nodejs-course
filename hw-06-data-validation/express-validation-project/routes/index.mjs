import { Router } from 'express'
import path from 'path'
import MainController from '../controllers/MainControllers.mjs'
const router = Router()
router.get('/', MainController.getMainPage)
router.get('/about', MainController.getAboutPage)

export default router
