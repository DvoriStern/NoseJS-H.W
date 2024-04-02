const bcrypt = require("bcrypt");
const { UserLogin, generateToken } = require("../models/userLogin.model.cjs");
 //const { userValidator } = require("../models/userLogin.model.cjs");

exports.signIn = async (req, res, next) => {
//    const v = userValidator.signInSchema.validate(req.body);
 // if (v) {
    const { email, password } = req.body;

    const user = await UserLogin.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (err) return next(new Error(err.message));

        if (same) {
          const token = generateToken(user);
          user.password = "****";
          return res.send({ user, token });
        }
        return next({ message: 'Auth Failed', status: 401 })
      });
    }
    else {
      return next({ message: 'Auth Failed', status: 401 })
     }
//   } else {
//     return next({ message: "details not correct", status: 401 });
//   }
};

exports.signUp = async (req, res, next) => {
  //   const v = userValidator.signUpSchema.validate(req.body);
//   if (v) {
    const { username, email, password,role } = req.body;

    try {
      const user = new UserLogin({ username, email, password ,role});
      await user.save();
      const token = generateToken(user);
      user.password = "****";

      return res.status(201).json({ user, token });
    } catch (error) {
      return next({ message: error.message, status: 409 });
    }
//   } else {
//     return next({ message: "details not correct", status: 401 });
//   }
};

exports.updatedUser = async (req, res, next) => {
  console.log("ssss");
  const { id } = req.params;
  const updatedUser = req.body;

  try {

      if (id !== updatedUser._id)
          return next({ message: 'user id conflict', status: 409 });
      // else if (req.user.role === "admin" || req.user.user_id === id) { // גם מנהל יכול לעדכן כל משתמש
      else if (req.user.user_id === id) {
          const u = await UserLogin.findByIdAndUpdate(
              id,
              { $set: updatedUser },
              { new: true } 
          )
          return res.json(u);
      }
      else { 
          next({ message: `cannot update user: ${id}, you can update only your details`, status: 403 })
      }
  } catch (error) {
      next(error);
  }
}

