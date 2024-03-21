const express = require('express');
const { users } = require('../db-demo.cjs');

const router = express.Router();

router.post('/signUp', (req, res) => {
    const newUser = req.body;
    console.log(newUser);

    let lastID = users[users.length - 1]._id + 1;
    if (isNaN(lastID))
        lastID = 1;

    newUser._id = lastID;
    users.push(newUser);
    res.status(201).send(newUser); 
})

router.post('/signIn',(req,res)=>{
    console.log(req.body);
    
    const user=users.find((a) => a.name == req.body.name)
    if(user){
        res.send(user)
    }
    else{
        res.status(404).json({ error: 'user not found!!!' });
    }

})

module.exports = router;