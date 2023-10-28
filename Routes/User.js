const express = require("express");
const router = express.Router();
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = await new User({ ...req.body, password: hashedPassword })
		const newUser = await user.save();
		if (newUser) {
			return res.json({
				error: false,
				message: "User Created Successfully!",
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
			})
		}
	} catch (err) {
		return res.json({
			error: true,
			message: err.message,
		})
	}
})

router.post('/signin', async (req, res) => {
	const user = await User.findOne({ email: req.body.email })
	if (!user) {
		return res.json({
			error: true,
			message: "User not found!",
		})
	} else {
		try {
			if (await bcrypt.compare(req.body.password, user.password)) {
				return res.json({
					error: false,
					message: "Signed In Successfully!",
					token: user._id
				})
			} else {
				return res.json({
					error: true,
					message: "Invalid Credientials!",
				})
			}
		} catch (error) {
			return res.json({
				error: true,
				message: error.message,
			})
		}
	}
})

router.get('/:_id', async (req, res) => {
	if (req.params._id) {
		const user = await User.findById(req.params._id)
		try {
			if (!user) {
				return res.json({
					error: true,
					message: "User not found!",
				})
			} else {
				return res.json({
					error: true,
					message: "Invalid Credientials!",
					profile: user
				})
			}
		} catch (error) {
			return res.json({
				error: true,
				message: error.message,
			})
		}
	} else {
		return res.json({
			error: true,
			message: "Not Signed In",
		})
	}
})

module.exports = router;