import { Router } from 'express'
// import CarsController from '../controllers/CarsControllers.mjs'
import uploadMiddleWare from '../middleware/uploadMiddleware.mjs'
import { carsValidationSchema } from '../validators/carsValidationSchema.js'

import { carsValidationMiddleware } from '../middleware/carsValidationMiddleware.js'

import CarsController from '../controllers/CarsControllers.mjs'

const router = Router()
router.get('/', CarsController.carList)
router.get('/create', CarsController.getCarForm) // відкриє сторінку форми
router.get('/update/:id', CarsController.getCarForm)
router.get('/:id', CarsController.carDetail)

router.post('/create', uploadMiddleWare.single('photo'), carsValidationMiddleware(carsValidationSchema), CarsController.registerCar) // на сторінці форми при заповнені полів вводу і натисненні на кнопку Зберегти додасть книгу в масив
router.post('/update/:id', uploadMiddleWare.single('photo'), carsValidationMiddleware(carsValidationSchema), CarsController.updateCar)

router.delete('/:id', CarsController.deleteCar)
export default router
