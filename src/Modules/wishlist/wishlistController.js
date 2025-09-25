import productModel from '../../../DataBase/models/product.Model.js';
import Wishlist from '../../../DataBase/models/wishlistModel.js';
import CatchError from '../../utils/CatchAyncError.js';
import { AppError } from '../../utils/CreateError.js';

// add product to wishlist
export const addToWishlist = CatchError(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.id;
  if (!(await productModel.findById(productId))) {
    return next(new AppError('Product not found', 404));
  }
  let wishlist = (await Wishlist.findOne({ userId })) || new Wishlist({ userId, items: [] });
  const existingItem = wishlist.items.find((i) => i.productId.toString() === productId);
  if (existingItem) {
    return next(new AppError('Product already in wishlist', 400));
  }
  wishlist.items.push({ productId });
  await wishlist.save();
  res.json({ message: 'Item added to wishlist', wishlist });
});

// get user wishlist
export const getUserWishlist = CatchError(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate(
    'items.productId',
    'name price'
  );
  if (!wishlist) return next(new AppError('Wishlist not found', 404));
  res.json({ wishlist });
});

// remove product from wishlist
export const removeFromWishlist = CatchError(async (req, res, next) => {
  const { productId } = req.params;
  let wishlist = await Wishlist.findOne({ userId: req.user.id });
  if (!wishlist) return next(new AppError('Wishlist not found', 404));
  wishlist.items = wishlist.items.filter((i) => i.productId.toString() !== productId);
  res.json({ message: 'Item removed', wishlist: await wishlist.save() });
});

// clear wishlist
export const clearWishlist = CatchError(async (req, res) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { userId: req.user.id },
    { items: [] },
    { new: true }
  );
  res.json({ message: 'Wishlist cleared', wishlist });
});
