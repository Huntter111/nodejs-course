// Задача 5. Створити додаток з історією. У файлі json зберігаємо усі роути та кількість відвідувань.
// У налаштуваннях settings.json зберігати який роут треба використати для перегляду історії та назву файлу де зберігається історія

import settings from './settings.json' with { type: 'json' }
import { createServer } from 'node:http'
import { readFile, readFileSync } from 'node:fs'
import fs from 'fs'

const { historyRoute, historyFilePath } = settings

function readJSONFile(filePath) {
	const data = readFileSync(filePath, 'utf8')
	return JSON.parse(data)
}

function writeJSONFile(filePath, dataObj) {
	fs.writeFileSync(filePath, JSON.stringify(dataObj))
}

function addDataToJsonFile(filePath, itemFilePath) {
	const dataObj = readJSONFile(filePath)
	if (itemFilePath in dataObj) dataObj[itemFilePath]++
	else dataObj[itemFilePath] = 1
	writeJSONFile(filePath, dataObj)
}

const server = createServer((req, res) => {
	const fileParameter = req.url.slice(1)
	const filePath = `${fileParameter}.html`

	if (fileParameter === historyRoute.slice(1)) {
		const data = readFileSync(historyFilePath, 'utf8')
		res.writeHead(200, { 'Content-Type': 'text/plain' })
		res.end(data)
		return
	}

	if (fs.existsSync(filePath)) {
		// appendFileSync(historyFilePath, filePath + '\n')
		addDataToJsonFile(historyFilePath, filePath)

		const data = readFileSync(filePath, 'utf8')
		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.end(data)
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' })
		res.end('File not found!\n')
	}
})

server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000')
})
