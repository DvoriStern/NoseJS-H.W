import { model, Schema } from 'mongoose';

const userSchema = new Schema({
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
    isBorrower: Boolean
});


const User = model('users', userSchema);

export default User;