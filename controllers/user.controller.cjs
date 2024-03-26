const { users } = require('../db-demo.cjs');

exports.signIn= async (req, res, next) => {
    console.log(req.body);
    
    const user=users.find((a) => a.name == req.body.name)
    if(user){
        res.send(user)
    }
    else{
        res.status(404).json({ error: 'user not found!!!' });
    }

}
exports.signUp= async (req, res, next) => {
    const newUser = req.body;
    console.log(newUser);

    let lastID = users[users.length - 1]._id + 1;
    if (isNaN(lastID))
        lastID = 1;

    newUser._id = lastID;
    users.push(newUser);
    res.status(201).send(newUser); 
}