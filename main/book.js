import mongoose from "mongoose";
import Book from "../models/book.model.js"

 export const findById = (id) => {
    if(mongoose.Types.ObjectId.isValid(id)){
      return Book.find({ _id:id});
    }
    else{
        console.log('error');
    }
}
export const findByKind = (kind) => {
    return Book.find({ kind:kind});  
}
export const findSortByName = () => {
    return Book.find().sort({ name:1 });
}
export const insertBook = async (name,kind,image,isLend) => {
    const newBook = new Book({ name,kind,image,isLend}); 
    await newBook.save(); 
    return newBook;
};
export const updateById = async (book) => {
    try {
        const b = await Book.findById(book._id);

        if (!b)
            throw new Error('id does not exists')

        b.name = book.name;
        b.kind=book.kind;
        b.image=book.image;
        b.isLend=book.isLend;

        await b.save();

    } catch (error) {
        console.log("error: " + error.message);
    }
}
export const removeBook = async (id) => {

    if (mongoose.Types.ObjectId.isValid(id))
        console.log(await Book.findByIdAndDelete(id)); // null אם לא קיים לא ימחק ויחזיר
    else
        console.log('קוד לא חוקי');
}


