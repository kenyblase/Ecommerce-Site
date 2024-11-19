import Product from "../models/productModels.js"
import User from "../models/userModels.js"

export const getCartProducts = async(req, res)=>{
    try {
        const user = req.user
        const products = await Product.find({_id:{$in:user.cartItems}})

        const cartItems = products.map(product=>{
            const item = user.cartItems.find(cartItem=> cartItem.id === product.id)
            return {...product.toJSON(), quantity:item.quantity}
        })

        res.status(200).json(cartItems)
    } catch (error) {
        console.log('Error in getCartProducts Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}
export const addToCart = async(req, res)=>{
try {
    const {productId} = req.body
    const user = req.user

    const existingItem = user.cartItems.find(item=> item.id === productId)
    if(existingItem){
        existingItem.quantity += 1
    }else{
        user.cartItems.push(productId)
    }

    await user.save()

    res.status(200).json(user.cartItems)
} catch (error) {
    console.log('Error in addToCart Controller:', error.message)
    res.status(500).json({message: 'Internal Server Error'})
}
}
export const removeAllFromCart = async(req, res)=>{
    try {
        const {productId} = req.body
        const user = req.user

        if(!productId){
            user.cartItems = []
        }else{
            user.cartItems = user.cartItems.filter(item=> item.id !== productId)
        }
        await user.save()

        res.status(200).json(user.cartItems)
    } catch (error) {
        console.log('Error in removeAllFromCart Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}
export const updateQuantity = async(req, res)=>{
    try {
        const {id: productId} = req.params
        const {quantity} = req.body
        const user = req.user
        const existingItem = user.cartItems.find(item=> item.id === productId)

        if(existingItem){
            if(quantity === 0){
                user.cartItems = user.cartItems.filter(item=>item.id !== productId)
                await user.save()
                return res.status(200).json(user.cartItems)
            }

            existingItem.quantity = quantity
            await user.save()
            res.status(200).json(user.cartItems)
        }else{
            res.status(400).json({message: 'product not found'})
        }
    } catch (error) {
        console.log('Error in updateQuantity Controlller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const emptyUserCart = async(req, res)=>{
    const user = req.user

    try {
        await User.updateOne({_id: user._id}, {$set:{cartItems: []}})
    
        res.json(user.cartItems) 
    } catch (error) {
        console.log('Error in emptyUserCart Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

