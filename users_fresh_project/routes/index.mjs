import MainController from '../controllers/MainController.mjs'

import { Router } from 'express'
const router = Router()
//---- обробка шляху '/'
router.get('/', MainController.info)
export default router
