const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 4 },
})

userLoginSchema.pre('save', function (next) {
    bcrypt.hash(this.password, +process.env.BCRYPT_SALT, async (err, hashPass) => {
        if (err)
            throw new Error(err.message);

        this.password = hashPass;
        next()
    })
})

module.exports.UserLogin = mongoose.model('usersLogin', userLoginSchema);