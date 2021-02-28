import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
function getProfileImage(name, image) {
	let running = true
	firebase
		.storage()
		.ref()
		.child(
			`/users/thumbnails/${name
				.split('.')
				.slice(0, -1)
				.join('.')}_500x500.${name.split('.').pop()}`
		)
		.getDownloadURL()
		.then(url => {
			if (running) return fetch(url)
			else throw new Error('cancled')
		})
		.then(res => res.blob())
		.then(blob => {
			if (running) {
				image({ name: name, blob })
			}
		})
		.catch(e => {
			console.log('not loaded')
		})
	return () => {
		running = false
	}
}

function ProfileImage({ src, onChange }) {
	const [url, setImage] = useState(null)
	useEffect(() => {
		let cancel = () => {}
		if (typeof src === 'string' && src.length) {
			cancel = getProfileImage(src, onChange)
		}
		if (src && src.blob) {
			setImage(window.URL.createObjectURL(src.blob))
		}
		return () => {
			cancel()
		}
	}, [src, onChange])
	if (!url) {
		return (
			<>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'center',
					}}
				>
					<label className="box" htmlFor="image">
						<div
							style={{
								backgroundColor: 'lightgrey',
								height: '7.5em',
								width: '7.5em',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							Touch Here
						</div>
					</label>
				</div>
				<input
					type="file"
					accept="image/*"
					id="image"
					style={{ visibility: 'hidden' }}
					onChange={async e => {
						let name = e.currentTarget.files[0].name
						const response = new Response(e.currentTarget.files[0])
						let blob = await response.blob()
						onChange({
							name: name,
							blob,
						})
					}}
				/>
			</>
		)
	} else
		return (
			<div
				style={{
					placeContent: 'center',
				}}
			>
				<label
					style={{
						display: 'flex',
						placeContent: 'center',
					}}
					htmlFor="image"
				>
					<img
						style={{
							backgroundSize: 'cover',
							height: '7.5em',
							width: '7.5em',
							borderRadius: '5%',
							boxShadow:
								'0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)',
						}}
						src={url}
						alt={src.name}
					/>
				</label>
				<input
					type="file"
					accept="image/*"
					id="image"
					style={{ visibility: 'hidden' }}
					onChange={async e => {
						let name = e.currentTarget.files[0].name
						const response = new Response(e.currentTarget.files[0])
						let blob = await response.blob()
						onChange({
							name: name,
							blob,
						})
					}}
				/>
			</div>
		)
}

export default ProfileImage
