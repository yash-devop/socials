import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required : true,
    },
    profilepic:{
        public_id:{
            type: String,
        },
        url:{
            type: String,
        }
    },
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    followings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
    ],
    comments: [
        {
            type: String,
            body:{
                type: String,
            },
            ref: "user",
        }
    ]
})

const UserModel = mongoose.models.users ||  mongoose.model('users',UserSchema);

export default UserModel;


// mongoose.Schema.Types.ObjectId