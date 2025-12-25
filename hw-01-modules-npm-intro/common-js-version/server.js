// server.mjs
const { User } = require('./reader')
const { createServer } = require('node:http')
const data = require('./data.json')

const server = createServer((req, res) => {
	const role = req.url.split('/').at(-1)

	const user = new User(data)
	const userName = user.show(role)
	const answer = `Simple copy text
director | manager | driver

User is ${userName}`

	res.writeHead(200, { 'Content-Type': 'text/plain' })
	res.end(answer)
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000')
})

// run with `npm start`
