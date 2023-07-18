import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required : true,
    },
    profilepic:{
        type: String,
    }
})

const UserModel = mongoose.models.users ||  mongoose.model('users',UserSchema);

export default UserModel;
