import path from 'path'
class MainController {
	static getMainPage(req, res, next) {
		const filePath = path.join(process.cwd(), 'public', 'html', 'home.html')
		res.sendFile(filePath, (err) => {
			if (err) return next(err)
		})
	}
	static getAboutPage(req, res, next) {
		const filePath = path.join(process.cwd(), 'public', 'html', 'about.html')
		res.sendFile(filePath, (err) => {
			if (err) return next(err)
		})
	}
}
export default MainController
