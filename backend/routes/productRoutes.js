import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProducts, toggleFeaturedProducts } from '../controllers/productController.js'
import { adminRoute, protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.get('/',protectRoute, adminRoute, getAllProducts)
router.get('/featured', getFeaturedProducts)
router.get('/category/:category', getProductsByCategory)
router.get('/recommendations', getRecommendedProducts)
router.post('/', protectRoute, adminRoute, createProduct)
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProducts)
router.delete('/:id', protectRoute, adminRoute, deleteProduct)

export default router