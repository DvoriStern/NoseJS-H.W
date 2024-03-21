import { model, Schema } from 'mongoose';


const bookSchema = new Schema({
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
    isLend: Boolean
});


const Book = model('books', bookSchema);

export default Book;