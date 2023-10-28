const mongoose = require('mongoose');
const { Schema } = mongoose;

const USER_SCHEMA = new Schema({
	name: String,
	email: {
		type: String,
		trim: true,
		validate: {
			validator: function (v) {
				return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
			},
			message: props => `${props.value} is not a valid email!`
		},
		unique: true
	},
	phone: String,
	password: String,
	college: String,
	age: Number,
	details: String,
});


module.exports = mongoose.model("USER", USER_SCHEMA);