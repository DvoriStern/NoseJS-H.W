const express = require("express");
const userRouter = require('./routes/user.route.cjs');
const bookRouter = require('./routes/book.route.cjs');

const app = express();

const logDate = (req, res, next) => {
    if (req.method === "GET") {
        const date=new Date(req.currentDate).toLocaleString();
      console.log( " at " +date);
    }
    next();
};

const addCurrentDateToBody = (req, res, next) => {
        req.currentDate=new Date();
        next();
}

app.use(addCurrentDateToBody);
app.use(logDate)


app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))





app.use('/user', userRouter);
app.use('/book', bookRouter);



const port = 5000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});