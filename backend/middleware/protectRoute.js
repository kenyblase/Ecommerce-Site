import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'

export const protectRoute = async(req, res, next)=>{
    try {
        const token = req.cookies['ecom-shop']
    
        if(!token){
            return res.status(401).json({message: 'Invalid Token'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if(!decoded){
            return res.status(400).json({message: 'Invalid Token'})
        }

        const user = await User.findById(decoded.userId).select('-password')

        if(!user){
            return res.status(400).json({message: 'User Not Found'})
        }

        req.user = user

        next()
    } catch (error) {
        console.log('Error In protectRoute Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
    
}

export const adminRoute = async(req, res, next)=>{
    if(req.user && req.user.role === 'admin'){
        next()
    }else{
        res.status(403).json({message: 'Access Denied'})
    }
}