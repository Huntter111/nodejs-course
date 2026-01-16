import { Router } from 'express'
import CarsController from '../controllers/CarsControllers.mjs'
import uploadMiddleWare from '../middleware/uploadMiddleware.mjs'

const router = Router()
router.get('/', CarsController.cars)
router.get('/create', CarsController.getCarForm) // відкриє сторінку форми
router.get('/update/:id', CarsController.getCarForm)
router.get('/:id', CarsController.carDetail)

router.post('/create', uploadMiddleWare.single('photo'), CarsController.createCar) // на сторінці форми при заповнені полів вводу і натисненні на кнопку Зберегти додасть книгу в масив
router.post('/update/:id', uploadMiddleWare.single('photo'), CarsController.updateCar)

router.delete('/', CarsController.deleteCar)
export default router
