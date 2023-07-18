import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    body: {
        type: String,
    },
    thread_pic:{
        type: String,
    }
})

const ThreadModel = mongoose.models.threads  || mongoose.model('threads',ThreadSchema);

export default ThreadModel;