export function getCurrentMonth(month) {
	let resultMonth = ''
	switch (month) {
		case 1:
			resultMonth = 'Січень'
			break
		case 2:
			resultMonth = 'Лютий'
			break
		case 3:
			resultMonth = 'Березень'
			break
		case 4:
			resultMonth = 'Квітень'
			break
		case 5:
			resultMonth = 'Травень'
			break
		case 6:
			resultMonth = 'Червень'
			break
		case 7:
			resultMonth = 'Липень'
			break
		case 8:
			resultMonth = 'Серпень'
			break
		case 9:
			resultMonth = 'Вересень'
			break
		case 10:
			resultMonth = 'Жовтень'
			break
		case 11:
			resultMonth = 'Листопад'
			break
		case 12:
			resultMonth = 'Грудень'
			break
		default:
			break
	}
	return resultMonth
}
export function getCurrentDay(day) {
	let resultDay = ''
	switch (day) {
		case 1:
			resultDay = 'Понеділок'
			break
		case 2:
			resultDay = 'Вівторок'
			break
		case 3:
			resultDay = 'Середа'
			break
		case 4:
			resultDay = 'Четвер'
			break
		case 5:
			resultDay = "П'ятниця"
			break
		case 6:
			resultDay = 'Субота'
			break
		case 7:
			resultDay = 'Неділя'
			break
		default:
			break
	}
	return resultDay
}
