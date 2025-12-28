// Задача 3. Через параметри запиту передають операцію
// (add, subtract, mult) і числа (розділені дефісами), які треба опрацювати
// Знайти результат і повернути користувачу. Наприклад при запиті:
// http://localhost:3000/add/12-4-23-45 - треба знайти суму чисел 12,4,23,45

import { createServer } from 'node:http'

const server = createServer((req, res) => {
	const route = req.url.split('/')[1]

	let message = ''
	const numbers = req.url
		.split('/')
		.at(-1)
		.split('-')
		.map(Number)
		.filter((n) => !Number.isNaN(n))
	switch (route) {
		case 'add':
			const sum = numbers.reduce((acc, num) => acc + num, 0)
			message = `Сума = ${sum}`
			break
		case 'subtract':
			const subtract = numbers.slice(1).reduce((acc, num) => acc - num, numbers[0])
			message = `Віднімання = ${subtract}`
			break
		case 'mult':
			const mult = numbers.reduce((acc, num) => acc * num, 1)
			message = `Добуток = ${mult}`
			break
		default:
			message = 'Використання: /add/12-4-23 | /subtract/10-3 | /mult/2-3-4'
			break
	}

	res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
	res.end(message)
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000')
})
