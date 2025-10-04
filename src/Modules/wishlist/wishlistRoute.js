import express from 'express';
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
  clearWishlist,
} from './wishlistController.js';
import { authuntcation } from '../../MiddleWare/auth.middleware.js';

const wishlistRouter = express.Router();

wishlistRouter.use(authuntcation);

wishlistRouter.post('/:productId',authuntcation, addToWishlist);
wishlistRouter.get('/',authuntcation, getUserWishlist);
wishlistRouter.delete('/:productId',authuntcation, removeFromWishlist);
wishlistRouter.delete('/',authuntcation, clearWishlist);

export default wishlistRouter;
