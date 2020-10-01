import faker from 'faker'

const orders = [
	{
		id: 'mXC3123a',
		name: 'test',
		driver: {
			name: 'TestDriver',
		},
		customer: {
			name: null,
		},
		address: 'Providence, RI',
		type: 'pick',
		total: 34.86,
		note: 'leave at backyard',
		items: [
			{
				product: {
					id: 'OP5n123',
					name: 'Apple',
					inventory: {
						stock: 134,
					},
					metric: {
						unit: '/unit',
					},
				},
				price: 3.99,
				qty: 2,
				actual: 2,
				status: false,
			},
		],
		status: [],
		completed: false,
	},
]

export { orders }
