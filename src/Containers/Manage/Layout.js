import { Paper, Container } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import DeletePop from './Components/DeleteConfirmation'
import Inventory from './Components/Inventory'
import ProductDialog from './Components/ProductDialog'
import { dialogContext } from './context'

const DIAG = 0
const INV = 1
const DEL = 2
function Layout({ children }) {
	const { view } = useContext(dialogContext)
	return (
		<Container>
			<Paper className={`root`}>
				{children}
				{view && view.id === DIAG && <ProductDialog open={view.state} />}
				{view && view.id === INV && <Inventory />}
				{view && view.id === DEL && <DeletePop />}
			</Paper>
		</Container>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
