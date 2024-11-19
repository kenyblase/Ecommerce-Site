import User from '../models/userModels.js'
import bcrypt from 'bcryptjs'
import {genTokenAndSetCookie} from '../lib/genTokenAndSetCookie.js'

export const Signup = async(req, res)=>{
    try {
        const {name, email, password} = req.body
        
        if(!name || !email || !password){
            return res.status(400).json({message: 'Please Fill In All Fields'})
        }

        if(password.length < 6 ){
            return res.status(400).json({message: 'Password Must Be At Least 6 Characters'})
        }
    
        const user = await User.findOne({email})
    
        if(user){
            return res.status(409).json({message: 'email already exists'})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save()
        genTokenAndSetCookie(newUser._id, res)
        res.status(201).json({newUser:
            {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }, message: 'Account Created Sucessfully'
        })
    } catch (error) {
        console.log('Error in Signup Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const Login = async(req, res)=>{
    const {email, password} = req.body

    if(!email || !password){
            return res.status(400).json({message: 'Please Fill In All Fields'})
        }

        const user = await User.findOne({email})
        
        if(!user){
            return res.status(409).json({message: 'Account Not Found'})
        }

        const decodedPassword = await bcrypt.compare(password, user.password)

        if(!decodedPassword){
            return res.status(400).json({message: 'Invalid Password'})
        }
        genTokenAndSetCookie(user._id, res)

        res.status(200).json({user:
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }, message: 'Logged In Sucessfully, Happy Shopping'
        })
}

export const Logout = async(req, res)=>{
    try {
        res.clearCookie('ecom-shop')
        res.status(200).json({message: 'Logged Out Sucessfully'})
    } catch (error) {
        console.log('Error in Logout Controller')
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getProfile = async(req, res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log('Error in getProfile Controller:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}