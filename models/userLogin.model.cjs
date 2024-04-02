const bcrypt = require('bcrypt');
//const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const addressSchema= new mongoose.Schema({
    city:String,
    street:String,
    num:Number
})
const minimalBookSchema = new mongoose.Schema({
    name: {type: String, minlength: 2, required: true},
    kind: {type: String, default:'Drama',enum: ['Drama', 'Kodesh', 'Childish']}
})

const userLoginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 4 },
    address:addressSchema,
    role: {
        type: String,
        default:'user',
        enum: ['user', 'admin'] 
    },
    books:[minimalBookSchema],
})

userLoginSchema.pre('save', function (next) {
    bcrypt.hash(this.password, +process.env.BCRYPT_SALT, async (err, hashPass) => {
        if (err)
            throw new Error(err.message);

        this.password = hashPass;
        next()
    })
})

// module.exports.userValidator = {
//     signInSchema: Joi.object({
//         email: Joi.string().email().required(),
//         password: Joi.string().min(6).max(10).required()
//     }),
//     signUpSchema: Joi.object({
//         username: Joi.string().required(),
//         email: Joi.string().email(),
//         password: Joi.string().min(4).max(10).minOfLowercase(2).minOfUppercase(1).minOfNumeric(2)
//     }),
// }

module.exports.generateToken = (user) => {
    const privateKey = process.env.JWT_SECRET || 'JWT_SECRET'; // מחרוזת סודית שלפיה נוצר הטוקן
    const data = { role: user.role, user_id: user._id }; // הנתונים שרלוונטיים עבור הרשאות משתמש
    const token = jwt.sign(data, privateKey, { expiresIn: '2h' }); // יצירת הטוקן + תפוגה
    return token;
}

module.exports.UserLogin = mongoose.model('usersLogin', userLoginSchema);