import Order from '../models/orderModels.js'

export const getAllOrders = async(req, res) => {
   try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user', 'email')
        res.status(200).json({orders})
    } catch (error) {
        console.log('Error In getAllOrders Controller:',error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}
export const getOrderDetails = async (req, res) => {
    const {id} = req.params
    const order = await Order.findById(id).populate('products.productId', 'name description image')

    if(!order) return res.status(500).json({message:'Order Not Found'})

    res.status(200).json({order})
}

export const togglePaymentStatus = async (req, res) => {
  try {
        const order = await Order.findById(req.params.id)
        if(order){
            order.status = !order.status
            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }else{
            res.status(400).json({message: 'No Order Found'})
        }
    } catch (error) {
        console.log('Error In togglePaymentStatus Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}
export const toggleDeliveryStatus = async (req, res) => {
  try {
        const order = await Order.findById(req.params.id)
        if(order){
            order.isDelivered = !order.isDelivered
            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }else{
            res.status(400).json({message: 'No Order Found'})
        }
    } catch (error) {
        console.log('Error In toggleDeliveryStatus Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}
export const deleteOrder = async (req, res) => {
   try {
        const order = await Order.findById(req.params.id) 

        if(!order){
            return res.status(400).json({message: 'Order Not Found'})
        }

        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Order Deleted Sucessfully'})
    } catch (error) {
        console.log('Error in deleteOrder Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}
