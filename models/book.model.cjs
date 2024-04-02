//import { model, Schema } from 'mongoose';
// const { default: Joi } = require('joi');
const mongoose = require('mongoose');



const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2, // אורך מינימלי
        required: true// שדה חובה
    },
    kind: {
        type: String,
        default:'Drama',
        enum: ['Drama', 'Kodesh', 'Childish'] // בחירה מתוך רשימה
    },
    image:{
        type:String,
        minlength:2,
    } ,
    isLend: {type:Boolean,default:false},
    numPages:{type:Number,
        minlength:1,
    },
    publishDate:{
        type:Date,
        default:Date.now
    },
    authers:[String],
    borrower: {
        type: mongoose.Types.ObjectId, ref: 'borrower',
        validate: {
            validator(v) {
                return this.isLend===true
            },
            required:true
        }
    },
});
// module.exports.bookValidator = {
//     newSchema: Joi.object({
//         name: Joi.string().min(2).required(),
//         authers: Joi.min(1).required()
//     }),
// }

// const Book = model('books', bookSchema);

// export default Book;
module.exports.Book = mongoose.model('books', bookSchema);