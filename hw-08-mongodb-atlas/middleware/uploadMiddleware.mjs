// import multer from 'multer'

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, 'uploads')
// 	},
// 	filename: function (req, file, cb) {
// 		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
// 		cb(null, uniqueSuffix + '-' + file.originalname)
// 	},
// })

// const uploadMiddleWare = multer({ storage: storage })
// export default uploadMiddleWare
// uploadMiddleware.mjs

// ! new
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads-tmp')
	},
	filename(req, file, cb) {
		const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, unique + '-' + file.originalname)
	},
})

export default multer({ storage })
