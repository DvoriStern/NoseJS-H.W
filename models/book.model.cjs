//import { model, Schema } from 'mongoose';
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
    isLend: Boolean,
    numPages:{type:Number,
        minlength:1,
    },
    publishDate:{
        type:Date,
        default:Date.now
    }
});


// const Book = model('books', bookSchema);

// export default Book;
module.exports.Book = mongoose.model('books', bookSchema);