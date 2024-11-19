import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required '],
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, 'Password is Required'],
        minlength:[6, 'Password Must be at least 6 Characters long']
    },
    cartItems:[{
        quantity: {
            type: Number,
            default: 1
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User