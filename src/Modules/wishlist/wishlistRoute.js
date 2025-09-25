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

wishlistRouter.post('/:productId', addToWishlist);
wishlistRouter.get('/', getUserWishlist);
wishlistRouter.delete('/:productId', removeFromWishlist);
wishlistRouter.delete('/', clearWishlist);

export default wishlistRouter;
