import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import ContentLoader from 'react-content-loader'
import classes from './Image.module.css'

function getSize(size) {
	switch (size) {
		case 'M':
			return '500x500'
		case 'S':
			return '200x200'
		case 'L':
			return '700x700'
		default:
			console.log('wrong')
	}
}

function getImage(type, name, size, set) {
	let running = true
	firebase
		.storage()
		.ref()
		.child(
			`/${type}/thumbnails/${name
				.split('.')
				.slice(0, -1)
				.join('.')}_${getSize(size)}.${name
				.split('.')
				.pop()
				.toLowerCase()}`
		)
		.getDownloadURL()
		.then(url => {
			if (running) return fetch(url)
			else throw new Error('cancled')
		})
		.then(res => new Response(res.body).blob())
		.then(blob => {
			const url = window.URL.createObjectURL(blob)

			if (running) set(url)
		})
		.catch(e => {
			console.log('not loaded')
		})
	return () => {
		running = false
	}
}

function BannerMarket() {
	return (
		<ContentLoader
			speed={2}
			width={128}
			height={128}
			viewBox="0 0 128 128"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="64" cy="63" r="61" />
		</ContentLoader>
	)
}

function Card() {
	return (
		<ContentLoader
			animate={false}
			speed={2}
			className={classes.contentloader}
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="-4" y="-22" rx="0" ry="0" width="279" height="397" />
		</ContentLoader>
	)
}

function Fav() {
	return (
		<ContentLoader
			speed={2}
			width={60}
			height={60}
			viewBox="0 0 60 60"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="30" cy="30" r="28" />
		</ContentLoader>
	)
}

function CartItem() {
	return (
		<ContentLoader
			speed={2}
			width={100}
			height={100}
			viewBox="0 0 100 100"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="-24" y="-29" rx="0" ry="0" width="156" height="153" />
		</ContentLoader>
	)
}

function ProductView() {
	return (
		<ContentLoader
			speed={2}
			width={500}
			height={500}
			viewBox="0 0 500 500"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="15" y="15" rx="0" ry="0" width="589" height="494" />
		</ContentLoader>
	)
}
function Image({
	type,
	size = 'M',
	name,
	style = {},
	className = '',
	variant = '',
}) {
	const [image, set] = useState(null)
	useEffect(() => {
		let cancel = () => {}
		if (!image && name) cancel = getImage(type, name, size, set)
		return () => {
			cancel()
		}
	}, [image, name, size, type])
	if (image)
		return <img src={image} alt="name" style={style} className={className} />
	else
		switch (variant) {
			case 'BannerMarket':
				return <BannerMarket />
			case 'ProductView':
				return <ProductView />
			case 'Card':
				return <Card />
			case 'CartItem':
				return <CartItem />
			case 'Fav':
				return <Fav />
			default:
				return <BannerMarket />
		}
}

Image.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.string,
	// TODO: require it again
	name: PropTypes.string,
}

export default Image
