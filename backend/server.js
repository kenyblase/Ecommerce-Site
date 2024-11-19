import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import connectDB from './connectDB/db.js'

const app = express()

const Port = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json({limit:'10mb'}))

if(process.env.NODE_ENV !== 'production'){
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
}
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/coupons', couponRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/orders', orderRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(Port, ()=>{
    connectDB()
    console.log('Server Is Running On Port', Port)
})