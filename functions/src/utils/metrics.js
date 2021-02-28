const units = [
	{ id: 1,
  name: 'Bunch',
  unit: '/bu'
}, {
  id: 2,
  name: 'Carton',
  unit: '/ctn'
}, {
  id: 3,
  name: 'Count',
  unit: '/cnt'
}, {
  id: 4,
  name: 'Head',
  unit: '/head'
}, {
  id: 5,
  name: 'Ounce',
  unit: '/oz'
}, {
  id: 6,
  name: 'Pound',
  unit: '/lb'
}, {
  id: 7,
  name: 'Pint',
  unit: '/pint'
}, {
  id: 8,
  name: 'Unit',
  unit: '/unit'
}, {
  id: 9,
  name: 'Gallon',
  unit: '/gal'
}, {
  id: 10,
  name: 'Dozen',
  unit: '/doz'
	}
]
function findMetricName (id) {
	return metrics.find(metric => metric.id === id ).name
}	
function findMetricUnit(id) {
	return metrics.find(metric => metric.id === id ).unit
}
export { findMetricName, findMetricUnit }
export default units
