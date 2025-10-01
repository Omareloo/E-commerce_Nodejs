import Cart from '../../../DataBase/models/cartModel.js';
import productModel from '../../../DataBase/models/product.Model.js';
import CatchError from '../../utils/CatchAyncError.js';
import { AppError } from '../../utils/CreateError.js';

// add product to cart
export const addToCart = CatchError(async (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.params;
  const userId = req.user.id;
  if (!quantity || quantity <= 0) {
    return next(new AppError('Quantity must be greater than 0', 400));
  }
  if (!(await productModel.findById(productId))) {
    return next(new AppError('Product not found', 404));
  }
  let cart = (await Cart.findOne({ userId })) || new Cart({ userId, items: [] });
  const existingItem = cart.items.find((i) => i.productId.toString() === productId);
  if (existingItem) {
    return next(new AppError('Product already in cart', 400));
  }
  cart.items.push({ productId, quantity: quantity || 1 });
  await cart.save();
  await cart.populate('items.productId');
  res.json({ message: 'Item added to cart', cart });
});

// get all carts with total price
export const getUserCart = CatchError(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  if (!cart) return next(new AppError('Cart not found', 404));
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  res.json({ cart, totalPrice });
});

// delete one product from cart
export const removeFromCart = CatchError(async (req, res, next) => {
  const { productId } = req.params;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return next(new AppError('Cart not found', 404));
  cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
  res.json({ message: 'Item removed', cart: await cart.save() });
});

// delete all products from cart
export const clearCart = CatchError(async (req, res) => {
  const cart = await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] }, { new: true });
  res.json({ message: 'Cart cleared', cart });
});

export const updateCartQuantity = CatchError(async (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.params;
  const userId = req.user.id;
  if (!quantity || quantity <= 0) return next(new AppError('Quantity must be greater than 0', 400));
  if (!(await productModel.findById(productId)))
    return next(new AppError('Product not found', 404));
  const cart = await Cart.findOne({ userId });
  if (!cart) return next(new AppError('Cart not found', 404));
  const item = cart.items.find((i) => i.productId.toString() === productId);
  if (!item) return next(new AppError('Product not in cart', 404));
  item.quantity = quantity;
  await cart.save();
  await cart.populate('items.productId');
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  res.json({ message: 'Cart updated', cart, totalPrice });
});
