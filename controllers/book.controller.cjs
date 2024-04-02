const mongoose = require('mongoose')
const {Book, bookValidator}= require("../models/book.model.cjs");

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find().select('-__v');
        return res.json(books);
    } catch (error) {
        next(error);
    }
};
exports.getBookById = (req, res, next) => {
    const id = req.params.id;

    console.log(mongoose.Types.ObjectId.isValid(id));
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })

    else {
        Book.findById(id, { __v: false })
            .then(b=> {
                res.json(b);
            })
            .catch(err => {
                next({ message: 'course not found', status: 404 })
            })
    }
};
exports.addBook = async (req, res, next) => {
    // const v=bookValidator.newSchema.validate(req.body);
    // if(v){
    try {
        console.log(req.user);
        if (req.user.role === "admin") {
        const b = new Book(req.body);
        await b.save(); // מנסה לשמור במסד נתונים
        return res.status(201).json(b); // כאן יהיו כל הנתונים של האוביקט שנשמר במ"נ
        }
        else {
            next({ message: 'only admin can add course', status: 403 })
        }
    } catch (error) {
        next(error);
    }
//   } else {
//     return next({ message: "details not correct", status: 401 });
//   }
};
exports.updateBook = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })

    try {
        const b = await Book.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true } // החזרת האוביקט החדש שהתעדכן
        )
        return res.json(b);
    } catch (error) {
        next(error)
    }
};
exports.deleteBook = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        next({ message: 'id is not valid' })

    else {
        try {
            if (!(await Book.findById(id)))
                return next({ message: 'course not found!!!', status: 404 })

            await Book.findByIdAndDelete(id)
            return res.status(204).send();
        } catch (error) {
            return next(error)
        }
    }
};
