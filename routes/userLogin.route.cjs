const express = require('express');
const {
    signIn,
    signUp,
    updatedUser
} = require('../controllers/userLogin.controller.cjs');
const { auth } = require('../middlewares/auth.cjs');

const router = express.Router();


router.post('/signin', signIn)

router.post('/signup', signUp)
router.put("/:id", auth, updatedUser);


module.exports = router;