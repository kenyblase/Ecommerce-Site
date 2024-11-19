import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity:{
                type:Number,
                required:true,
                min:1,
            },
            price:{
                type: Number,
                required:true,
                min:0
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
  status: { 
    type: Boolean,
    default: false
 }, 
 isDelivered:{
    type:Boolean,
    default: false
 }
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema)

export default Order