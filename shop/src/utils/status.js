function getStatus(status, home) {
	switch (status.length) {
		case 1:
			return 'WEIGHING'
		case 2:
			return home ? 'PICKED UP' : 'READY'
		case 3:
			return 'ON THE WAY'
		default:
			return 'ERROR'
	}
}

export { getStatus }
