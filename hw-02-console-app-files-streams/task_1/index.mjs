import readline from 'node:readline'

// Отримано аргументи командного рядка (без node та імені файлу)
const params = process.argv.slice(2)

// Об'єднано аргументи в один рядок для подальшого парсингу
const joinedParamsString = params.join('&')

// Використано URLSearchParams для створення об'єкта
const argsString = new URLSearchParams(joinedParamsString)

// Отримано значення за ключем '--pension'
const pensionAge = Number(argsString.get('--pension'))

// Якщо пенсійний вік не передано або він некоректний
if (!pensionAge) {
	console.log('Не вказано пенсійний вік. Використовуйте --pension=65')
	process.exit(1)
}

// Створено інтерфейс для введення та виведення даних
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})
// Запитуємо вік користувача та обробляємо відповідь
rl.question('Скільки вам повних років? ', (answer) => {
	const age = Number(answer)
	const isPensioner = age >= pensionAge
	console.log(`Ви ${isPensioner ? 'пенсіонер' : 'не пенсіонер'}`)
	rl.close()
})
