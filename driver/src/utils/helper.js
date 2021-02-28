const days = [
	{ id: 0, name: 'Sunday' },
	{ id: 1, name: 'Monday' },
	{ id: 2, name: 'Tuesday' },
	{ id: 3, name: 'Wednesday' },
	{ id: 4, name: 'Thurday' },
	{ id: 5, name: 'Friday' },
	{ id: 6, name: 'Saturday' },
]
export function get12HourClock(hour) {
	let n = 0
	if (hour % 12) {
		n = hour % 12
	} else {
		n = hour
	}
	return n + ' ' + (n > 12 ? 'pm' : 'am')
}
export { days }
