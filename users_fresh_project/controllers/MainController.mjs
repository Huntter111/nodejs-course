class MainController {
	static info(req, res) {
		res.render('index', { title: 'Main page' })
	}
}
export default MainController
