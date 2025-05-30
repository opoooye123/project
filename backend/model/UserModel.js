import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Must be greater than 6']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }

},
    { timestamps: true }
)

const User = mongoose.model('user', userSchema)

export default User;