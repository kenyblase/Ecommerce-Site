import Product from '../models/productModels.js'
import cloudinary from '../lib/cloudinary.js'

export const getAllProducts = async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({products})
    } catch (error) {
        console.log('Error In getAllProducts Controller:',error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getFeaturedProducts = async(req, res)=>{
    try {
        const featuredProducts = await Product.find({isFeatured:true}).lean()
        
        if(!featuredProducts){
            return res.status(404).json({message: 'No Featured Products Found'})
        }

        res.status(200).json(featuredProducts)
    } catch (error) {
        console.log('Error in getFeaturedProducts Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const createProduct = async(req, res)=>{
    try {
        const {name, description, price, image, category} = req.body

        let cloudinaryResponse = null 

        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder:'products'})
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : '',
            category
        })

        res.status(201).json(product)
    } catch (error) {
        console.log('Error in createPost Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const deleteProduct = async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id) 

        if(!product){
            return res.status(400).json({message: 'Product Not Found'})
        }

        if(product.image){
            const imageId = product.image.split('/').pop().split('.')[0]

            try {
                await cloudinary.uploader.destroy(`products/${imageId}`)
                console.log('deleted image from cloudinary')
            } catch (error) {
                console.log('error deleting image from cloudinary', error)
            }
        }

        await Product.findByIdAndDelete(req.params.id)
    } catch (error) {
        console.log('Error in deleteProduct Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getRecommendedProducts = async(req, res)=>{
    try {
        const products = await Product.aggregate([
            {
                $sample: {size:3}
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description: 1,
                    image: 1,
                    price:1
                }
            }
        ])

        res.json(products)
    } catch (error) {
        console.log('Error in getRecommendedProducts Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getProductsByCategory = async(req, res)=>{
    try {
        const {category} = req.params

        const products = await Product.find({category})

        res.json({products})
    } catch (error) {
        console.log('Error in getProductsByCategory Controller:', error.message)
        res.status(500).json({message:'Internal Server Error'})
    }
}

export const toggleFeaturedProducts = async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(product){
            product.isFeatured = !product.isFeatured
            const updatedProduct = await product.save()
            res.json(updatedProduct)
        }else{
            res.status(400).json({message: 'No Product Found'})
        }
    } catch (error) {
        console.log('Error In toggleFeaturedProducts Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}