import { Router } from 'express';
import {
  getCurrentUser,
  getUserById,
  getUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from '../controllers/users.js';
import {
  getProductById,
  getProducts,
  addProduct,
  changeProduct,
  deleteProduct,
} from '../controllers/products.js';
import {
  getCartContentById,
  getCarts,
  createCart,
  updateCart,
  clearCart,
} from '../controllers/carts.js';
import {
  getOrderById,
  getOrders,
  createOrder,
  changeOrder,
  deleteOrder,
} from '../controllers/orders.js';
import { authMiddleware } from '../middlewares/auth.js';
import { createAccessCheckMiddleware } from '../middlewares/accessCheck.js';
const checkAdminAccess = createAccessCheckMiddleware(1);
const checkUserAccess = createAccessCheckMiddleware(2);

export const router = Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);

router.use(authMiddleware);

router.get('/users/me', getCurrentUser);
router.get('/users', checkAdminAccess, getUsers);
router.get('/users/:id', checkAdminAccess, getUserById);
router.patch('/users/:id', checkUserAccess, updateUser);
router.delete('/users/:id', checkAdminAccess, deleteUser);

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', checkAdminAccess, addProduct);
router.patch('/products/:id', checkAdminAccess, changeProduct);
router.delete('/products/:id', checkAdminAccess, deleteProduct);

router.get('/carts', checkAdminAccess, getCarts);
router.get('/carts/:id', checkUserAccess, getCartContentById);
router.post('/carts/:id', checkAdminAccess, createCart);
router.patch('/carts/:id', checkUserAccess, updateCart);
router.delete('/carts/:id', checkUserAccess, clearCart);

router.get('/orders', checkAdminAccess, getOrders);
router.get('/orders/:id', checkUserAccess, getOrderById);
router.post('/orders/:id', checkUserAccess, createOrder);
router.patch('/orders/:id', checkAdminAccess, changeOrder);
router.delete('/orders/:id', checkAdminAccess, deleteOrder);
