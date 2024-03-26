const bcrypt = require('bcrypt');
const { UserLogin } = require("../models/userLogin.model.cjs");

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await UserLogin.findOne({ email })

    if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
            if (err)
                return next(new Error(err.message));

            if (same) {
                return res.send({ user });
            }
            next({ message: 'Auth Failed', status: 401 })
        })
    }

}

exports.signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = new UserLogin({ username, email, password });
        await user.save();

        return res.status(201).json(user);
    } catch (error) {
        return next({ message: error.message, status: 409 })
    }
}