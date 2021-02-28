/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tab extends Component {
	static propTypes = {
		activeTab: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
	}

	onClick = () => {
		const { label, onClick } = this.props
		onClick(label)
	}
	render() {
		const {
			onClick,
			props: { activeTab, label },
		} = this

		let className = 'tab-list-item'

		if (activeTab === label) {
			className += ' tab-list-active'
		}

		return (
			<li className={className} onClick={onClick}>
				<a className="tab">
					<span>
						{label.padEnd(label.length + 1).padStart(label.length + 1)}
					</span>
				</a>
			</li>
		)
	}
}

export default Tab
