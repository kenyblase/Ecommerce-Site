import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import {createCheckoutSession, createOrder, getContactNumber} from '../controllers/paymentController.js'

const router = express.Router()

router.get('/get-details', protectRoute, createCheckoutSession)
router.post('/checkout-success', protectRoute, createOrder)
router.get('/get-contact', protectRoute, getContactNumber)

export default router