import { Router } from 'express'
import path from 'path'
import MainController from '../controllers/MainController.mjs'

const router = Router()
router.get('/', MainController.mainPage)
router.get('/about', MainController.aboutPage)
router.get('/contacts', MainController.contactsPage)

export default router
