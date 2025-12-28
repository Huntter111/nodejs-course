// Задача 2. Користувач через роут ‘/save_num/число’
// може передати на сервер якесь число.
// Ці числа поступово треба зберігати у текстовому файлі numbers.txt.
// Наприклад, використовуючи такий роут: http://localhost:3000/save_num/78 - у файл треба додати число 78.
// А використовуючи роути ‘/sum’ – знайти суму, ‘mult’ – знайти добуток. За роутом «/remove» файл треба видалити.

import fs from 'fs'
import { createServer } from 'node:http'
import { appendFile, unlink, writeFile, readFile } from 'fs/promises'

function parseNumbers(data) {
	return data
		.trim()
		.split('\n')
		.map(Number)
		.filter((num) => !Number.isNaN(num))
}
async function readAsyncFile(filePath) {
	try {
		const data = await readFile(filePath, 'utf8')
		console.log(data)
		return data
	} catch (err) {
		console.error(err)
		return ''
	}
}
async function appendTextToFile(filePath, text) {
	try {
		await appendFile(filePath, `${text}\n`, 'utf8')
		console.log(`File ${filePath} was changed!`)
	} catch (err) {
		console.error(err)
	}
}
async function createTextFile(filePath, content) {
	try {
		await writeFile(filePath, `${content}\n`, 'utf8')
		console.log(`File ${filePath} created successfully`)
	} catch (err) {
		console.error(err)
	}
}
async function deleteFile(filePath) {
	try {
		await unlink(filePath)
		console.log(`File ${filePath} delete successfully`)
	} catch (err) {
		console.error(err)
	}
}

const server = createServer(async (req, res) => {
	// перевірка існування файлу

	const filePath = 'numbers.txt'

	const route = req.url.split('/')[1]

	async function getResult(route, filePath) {
		const fileIsExist = fs.existsSync(filePath)
		let message = ''

		switch (route) {
			case 'remove':
				if (fileIsExist) {
					await deleteFile(filePath)
					message = `Видалено файл ${filePath}`
				} else {
					message = `Файл ${filePath} не існує`
				}
				break

			case 'save_num':
				const urlNumber = req.url.split('/').at(-1)
				if (isNaN(urlNumber)) {
					message = `Ви ввели не число, а ${urlNumber}`
					break
				}
				if (fileIsExist) {
					await appendTextToFile(filePath, urlNumber)
					message = `Додано число ${urlNumber} до файлу ${filePath}`
				} else {
					await createTextFile(filePath, urlNumber)
					message = `Файл за шляхом ${filePath} створено і додано число ${urlNumber}`
				}
				break
			case 'mult':
				const multData = await readAsyncFile(filePath)
				const multNumbersArr = parseNumbers(multData)
				if (multNumbersArr.length > 0) {
					const mult = multNumbersArr.reduce((acc, num) => acc * num, 1)
					message = `Добуток = ${mult}`
				} else {
					message = `Додайте числа за допомгою /save_num/45`
				}
				break
			case 'sum':
				const sumData = await readAsyncFile(filePath)
				const sumNumbersArr = parseNumbers(sumData)
				if (sumNumbersArr.length > 0) {
					const sum = sumNumbersArr.reduce((acc, num) => acc + num, 0)
					message = `Сума чисел = ${sum}`
				} else {
					message = `Додайте числа за допомгою /save_num/45`
				}
				break
			default:
				message =
					'Доступні маршрути:\n' +
					'/save_num/число  — додати число у файл\n' +
					'/sum             — знайти суму всіх чисел\n' +
					'/mult            — знайти добуток всіх чисел\n' +
					'/remove          — видалити файл numbers.txt'
				break
		}
		return message
	}
	const result = await getResult(route, filePath)
	res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
	res.end(result)
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000')
})
