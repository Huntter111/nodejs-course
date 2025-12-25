// const data = (await import('./data.json', { with: { type: 'json' } })).default // ! динамічний імпорт

// server.mjs
import data from './data.json' with { type: 'json' }
import { createServer } from 'node:http'
import { User } from './reader.mjs'

const user = new User(data)
function buildAnswer(userName) {
	return `ES 6 Version
director | manager | driver

User is ${userName}`
}
const server = createServer((req, res) => {
	
	const role = req.url.split('/').at(-1)
	const userName = user.show(role)
	const answer = buildAnswer(userName)

	res.writeHead(200, { 'Content-Type': 'text/plain' })
	res.end(answer)
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000')
})

// run with `npm start`
