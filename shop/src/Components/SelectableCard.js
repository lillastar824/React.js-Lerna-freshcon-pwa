import React from 'react'
import classes from './SelectableCard.module.css'

function Card(props) {
	return <div className={classes.card}>{props.children}</div>
}

function SelectableCard(props) {
	return (
		<Card>
			<div
				className={`${classes.selectable} ${
					props.selected ? classes.selected : ''
				}`}
				onClick={props.onClick}
			>
				{props.children}
				<div className={classes.check}>
					<span className={classes.checkmark}>✔</span>
				</div>
			</div>
		</Card>
	)
}

function SelectableTitleCard(props) {
	var { name, address, zip, city, state, note, selected } = props
	return (
		<SelectableCard onClick={props.onClick} selected={selected}>
			<div className={classes.content}>
				<h1 className={classes.title}>{name}</h1>
				<p className={classes.description}>{address}</p>
				<p className={classes.description}>
					{zip}
					{city}
					{state}
				</p>
				<p className={classes.description}>{note}</p>
			</div>
		</SelectableCard>
	)
}

export default SelectableTitleCard
