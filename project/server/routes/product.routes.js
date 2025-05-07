import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getFeaturedProducts,
  getTopRatedProducts,
  getProductsByCategory,
} from '../controllers/product.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), upload.array('images', 5), createProduct);

router.get('/featured', getFeaturedProducts);
router.get('/top-rated', getTopRatedProducts);
router.get('/category/:categoryId', getProductsByCategory);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorize('admin'), upload.array('images', 5), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

router.post('/:id/reviews', protect, createProductReview);

export default router;