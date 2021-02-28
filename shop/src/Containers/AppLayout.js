import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Drawer from 'rc-drawer'
import CartView from './CartView'
import 'rc-drawer/assets/index.css'
import { useMedia } from 'react-use'
import { appContext } from '../Provider'
import produce from 'immer'
function AppLayout({ children }) {
	const { state, set } = useContext(appContext)
	const desktop = useMedia('(min-width: 1600px')
	const notebook = useMedia('(min-width: 1200px')
	const tablet = useMedia('(min-width: 780px')
	const [screen, setScreen] = useState('100%')
	useEffect(() => {
		function getScreen() {
			if (desktop) {
				setScreen('30%')
			} else if (notebook) {
				setScreen('40%')
			} else if (tablet) {
				setScreen('50%')
			} else setScreen('100%')
		}
		getScreen()
	}, [desktop, notebook, setScreen, tablet])
	function close() {
		let next = produce(state, (draft) => {
			draft.view = false
		})
		set(next)
	}
	function open() {
		let next = produce(state, (draft) => {
			draft.view = true
		})
		set(next)
	}
	return (
		<>
			<Header draw={open} />
			<Drawer
				className="drawer1"
				open={state.view}
				onClose={close}
				handler={false}
				level={null}
				placement="right"
				width={screen}
			>
				<CartView close={close} />
			</Drawer>
			{children}
		</>
	)
}

export default AppLayout
