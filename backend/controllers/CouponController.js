import Coupon from "../models/couponModels.js"

export const getCoupon = async(req, res) => {
  try {
    const user = req.user
    const coupon = await Coupon.findOne({userId: user._id, isActive:true})
    res.status(200).json(coupon || null)
  } catch (error) {
    console.log('Error in getCoupon Controller:', error.message)
    res.status(500).json({message: 'Internal Server Error'})
  }
}

export const validateCoupon = async(req, res) => {
    try {
        const {code} = req.body
        const user = req.user
        const coupon = await Coupon.findOne({code:code, userId:user._id, isActive: true})
      
        if(!coupon){
          return res.status(404).json({message: 'Coupon Not Found'})
        }
        if(coupon.expirationDate < new Date()){
            coupon.isActive = false
            await coupon.save()
            return res.status(404).json({message: 'Coupon Expired'})
        }

        res.json({
            message: 'Coupon is Valid',
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        })
    } catch (error) {
        console.log('Error in validateCoupon Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}