// Задача 4. Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”) повертає створені HTML документи (розмістіть їх там же, де і додаток), що описують:
// інформацію про себе, інфорімацію про улюблену кав’ярню, інформацію про улюблений музичний гурт.

import { readFile } from 'fs/promises'
import { createServer } from 'node:http'

const server = createServer(async (req, res) => {
	if (req.url === '/favicon.ico') {
		res.writeHead(204)
		res.end()
		return
	}
	const filePath = req.url.slice(1)
	console.log('🚀 ~ filePath:', typeof filePath)
	const files = ['coffee', 'music', 'index']

	if (files.includes(filePath)) {
		const data = await readFile(`${filePath}.html`, 'utf8')
		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.end(data)
	} else if (filePath === '') {
		const data = await readFile('index.html', 'utf8')
		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.end(data)
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' })
		res.end('File not found!')
	}
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000')
})
