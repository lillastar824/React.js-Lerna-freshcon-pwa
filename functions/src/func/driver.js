import * as admin from 'firebase-admin'
import cors from 'cors'
import express from 'express'
let app = express()
app.use(
	cors({
		origin: true,
	})
)
async function checkDriver(req, res) {
	const number = req.body
	let exist = false
	console.log(number)
	try {
		let user = await admin.auth().getUserByPhoneNumber(number)
		if (user) exist = true
	} catch (err) {
		console.log(err.code, err.code === 'auth/user-not-found')
	}
	res.json({
		exist,
	})
}

app.post('/', checkDriver)
export default app
