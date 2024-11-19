import express from 'express'
import { adminRoute, protectRoute } from '../middleware/protectRoute.js'
import { deleteOrder, getAllOrders, getOrderDetails, toggleDeliveryStatus, togglePaymentStatus } from '../controllers/orderController.js'

const router = express.Router()

router.get('/',protectRoute, adminRoute, getAllOrders)

router.get('/:id',protectRoute, adminRoute, getOrderDetails)

router.patch('/:id', protectRoute, adminRoute, togglePaymentStatus)

router.patch('/delivery/:id', protectRoute, adminRoute, toggleDeliveryStatus)

router.delete('/:id', protectRoute, adminRoute, deleteOrder)


export default router