import express from 'express';
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
  clearWishlist,
} from './wishlistController';
import { authuntcation } from '../../MiddleWare/auth.middleware';

const wishlistRouter = express.Router();

wishlistRouter.use(authuntcation);

wishlistRouter.post('/:productId', addToWishlist);
wishlistRouter.get('/', getUserWishlist);
wishlistRouter.delete('/:productId', removeFromWishlist);
wishlistRouter.delete('/', clearWishlist);

export default wishlistRouter;
