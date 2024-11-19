import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        minimum: 0,
        required: true
    }, 
    image:{
        type:String,
        required: [true, 'Image is Required']
    }, 
    category: {
		type: String,
		required: true,
	},
    isFeatured:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

export default Product