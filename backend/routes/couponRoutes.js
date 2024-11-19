import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { getCoupon, validateCoupon } from '../controllers/CouponController.js'

const router = express.Router()

router.get('/', protectRoute, getCoupon)
router.get('/validate', protectRoute, validateCoupon)

export default router