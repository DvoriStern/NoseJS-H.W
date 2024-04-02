const express = require('express');
//const { books } = require('../db-demo.cjs');
const { auth } = require('../middlewares/auth.cjs');

const {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
  } = require("../controllers/book.controller.cjs");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/",auth ,addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

// router.get('/:id',(req,res)=>{
//     const { id } = req.params;
//     const book=books.find((b)=>b._id===+id);
//     console.log(book);
//     if(book){
//         res.send(book)
//     }
//     else{
//         res.status(404).json({ error: 'book not found!!!' });
//     }
// })
// router.get('/',(req,res)=>{
//     res.send(books);
// })
// router.post('/',(req,res)=>{
//     const newBook = req.body;
//     console.log(newBook);

//     let lastID = books[books.length - 1]._id + 1;
//     if (isNaN(lastID))
//         lastID = 1;

//     newBook._id = lastID;
//     books.push(newBook);
//     res.status(201).send(newBook); 
// })

// router.put('/:id',(req,res)=>{
//     const  id  = +req.params.id;

//     if (id !== req.body._id) {
//         return res.status(409).json({ error: 'body.id != parameter id' }); 
//     }

//     const book = books.find((b)=>b._id===id);
//     console.log(book);

//     if(book){
//         book.image=req.body.image||book.image;
//         book.kind=req.body.kind||book.kind;
//         book.isLend=req.body.isLend||book.isLend;
//         book.name=req.body.name||book.name;

//         return res.send(book);
//     }
//     res.status(404).json({ error: 'book not found!!!' });

// })

// router.delete("/:id",(req,res)=>{
//     const  id  = +req.params.id;

//     const index = books.findIndex((b)=>b._id===id);

//     books.splice(index, 1);

//     res.send({ massage: "successfull" })

// })

module.exports = router;