const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please tell us fullname']
    },
    email: {
        type: String,
        required: [true, 'Please tell us email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please tell us password'],
        minLength: 6,
    }
});

userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;