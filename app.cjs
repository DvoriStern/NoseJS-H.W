const express = require("express");
const userRouter = require('./routes/user.route.cjs');
const userLoginRouter = require('./routes/userLogin.route.cjs');
const bookRouter = require('./routes/book.route.cjs');
const morgan = require("morgan");
const cors = require("cors");

const { pageNotFound, serverNotFound } = require("./middlewares/handleErrors.cjs");
const { default: mongoose } = require("mongoose");
//const config = require('./config.cjs');
const app = express();

// // connect to db
// mongoose.connect(config.DB_URL)
//   .then(() => console.log('mongo db connected'))
//   .catch(err => console.log(err));

require('dotenv').config();

require('./config/db.cjs')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("wellcome");
});


app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/userLogin', userLoginRouter);


// אם הגענו לכאן - ניתוב לא קיים
app.use(pageNotFound);
app.use(serverNotFound);


// const logDate = (req, res, next) => {
//     if (req.method === "GET") {
//         const date=new Date(req.currentDate).toLocaleString();
//       console.log( " at " +date);
//     }
//     next();
// };

// const addCurrentDateToBody = (req, res, next) => {
//         req.currentDate=new Date();
//         next();
// }

// app.use(addCurrentDateToBody);
// app.use(logDate)


// app.use(express.json()) 
// app.use(express.urlencoded({ extended: false }))

const port = 5000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});