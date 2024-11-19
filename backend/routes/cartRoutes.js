import express from 'express'
import { addToCart, emptyUserCart, getCartProducts, removeAllFromCart, updateQuantity } from '../controllers/cartController.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.get('/', protectRoute, getCartProducts)
router.post('/', protectRoute, addToCart)
router.delete('/', protectRoute, removeAllFromCart)
router.put('/:id', protectRoute, updateQuantity)
router.get('/clear-cart', protectRoute, emptyUserCart)

export default router