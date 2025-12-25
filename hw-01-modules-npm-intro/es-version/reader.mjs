export class User {
	constructor(data) {
		this.data = data
	}
	show(role) {
		if (role in this.data) {
			return this.data[role]
		} else {
			return `No such role as '${role}'`
		}
	}
}
