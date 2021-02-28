const categories = [
	{
		id: 1,
		name: 'Cannned Goods',
	},
	{
		id: 2,
		name: 'Eggs',
	},
	{
		id: 3,
		name: 'Dry Goods',
	},
	{
		id: 4,
		name: 'Bakery',
	},
	{
		id: 5,
		name: 'Household Goods',
	},
	{
		id: 6,
		name: 'Dairy',
	},
	{
		id: 7,
		name: 'Fruit',
	},
	{
		id: 8,
		name: 'Care Items',
	},
	{
		id: 9,
		name: 'Beverage',
	},
	{
		id: 10,
		name: 'Jarred Goods',
	},
	{
		id: 11,
		name: 'Meat',
	},
	{
		id: 12,
		name: 'Pets',
	},
	{
		id: 13,
		name: 'Produce',
	},
	{
		id: 14,
		name: 'Seafood',
	},
	{
		id: 15,
		name: 'Snacks',
	},
	{
		id: 16,
		name: 'Vegetables',
	},
]

function findCategoryName(id) {
	return categories.find(category => category.id === id).name
}
export { findCategoryName }
export default categories
