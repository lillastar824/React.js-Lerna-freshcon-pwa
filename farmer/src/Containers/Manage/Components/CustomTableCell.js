import { TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const CustomTableCell = withStyles(theme => ({
	body: {
		fontSize: 14,
	},
}))(TableCell)

export default CustomTableCell
