import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfile,
  addAddress,
  removeAddress,
  setDefaultAddress,
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin routes
router.route('/')
  .get(protect, authorize('admin'), getUsers);

router.route('/:id')
  .get(protect, authorize('admin'), getUserById)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

// User routes
router.put('/profile', protect, updateProfile);

// Address routes
router.post('/address', protect, addAddress);
router.delete('/address/:addressId', protect, removeAddress);
router.put('/address/:addressId/default', protect, setDefaultAddress);

export default router;