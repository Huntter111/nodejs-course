import { Router } from 'express'
import CarsController from '../controllers/CarsControllers.mjs'
import uploadMiddleWare from '../middleware/uploadMiddleware.mjs'
import CarsValidator from '../controllers/carsValidator.js'
import { checkSchema } from 'express-validator'

const router = Router()
router.get('/', CarsController.cars)
router.get('/create', CarsController.getCarForm) // відкриє сторінку форми
router.get('/update/:id', CarsController.getCarForm)
router.get('/:id', CarsController.carDetail)

// ! ================ Chain Validator =====================================
router.post('/create', uploadMiddleWare.single('photo'), CarsValidator.CarsValidatorRules, CarsController.createCar) // на сторінці форми при заповнені полів вводу і натисненні на кнопку Зберегти додасть книгу в масив

router.post('/update/:id', uploadMiddleWare.single('photo'), CarsValidator.CarsValidatorRules, CarsController.updateCar)
// ! ======================Schema Validator =================================
router.post(
	'/create',
	uploadMiddleWare.single('photo'),
	checkSchema(CarsValidator.CarsValidatorSchema),
	CarsController.createCar,
)
router.post(
	'/update/:id',
	uploadMiddleWare.single('photo'),
	checkSchema(CarsValidator.CarsValidatorSchema),
	CarsController.updateCar,
)

router.delete('/', CarsController.deleteCar)
export default router
