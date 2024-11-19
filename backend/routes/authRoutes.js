import express from 'express'
import { getProfile, Login, Logout, Signup } from '../controllers/authController.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.post('/signup', Signup)

router.post('/login', Login)

router.post('/logout', Logout)

router.get('/profile', protectRoute, getProfile)

export default router