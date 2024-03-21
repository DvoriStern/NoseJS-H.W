import mongoose from "mongoose";
import User from "../models/user.model.js";

export const findById = (id) => {
    if(mongoose.Types.ObjectId.isValid(id)){
      return User.find({ _id:id});
    }
    else{
        console.log('error');
    }
}
export const findSortByName = () => {
    return User.find().sort({ name:1 });
}
export const findByKind = (kind) => {
    return User.find({ kind:kind});  
}
export const insertUser = async (name,kind,isBorrower) => {
    const newUser = new User({ name,kind,isBorrower}); 
    await newUser.save(); 
    return newUser;
};

export const updateById = async (user) => {
    try {

        const u = await User.findById(user._id);

        if (!u)
            throw new Error('id does not exists')

        u.name = user.name;
        u.kind=user.kind;
        u.image=user.image;
        u.isLend=user.isLend;

        await b.save();

    } catch (error) {
        console.log("error: " + error.message);
    }
}
export const removeUser = async (id) => {

    if (mongoose.Types.ObjectId.isValid(id))
        console.log(await User.findByIdAndDelete(id)); // null אם לא קיים לא ימחק ויחזיר
    else
        console.log('קוד לא חוקי');
}