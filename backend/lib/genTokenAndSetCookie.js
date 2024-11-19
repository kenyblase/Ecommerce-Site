import jwt from 'jsonwebtoken'

export const genTokenAndSetCookie = async(userId, res)=>{
    const token = jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn: '7d'})

    res.cookie('ecom-shop', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7*24*60*60*1000
    })
}