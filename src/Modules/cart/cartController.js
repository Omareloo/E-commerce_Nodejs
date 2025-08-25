import Cart from "../../../DataBase/models/cartModel.js";
import CatchError from "../../utils/CatchAyncError.js";

// add product to cart 
export const addToCart = CatchError(async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;
    if (!quantity || quantity <= 0) { return res.status(400).json({ message: "Quantity must be greater than 0" }); }
    if (!(await Product.findById(productId))) { return res.status(404).json({ message: "Product not found" }); }
    let cart = await Cart.findOne({ userId }) || new Cart({ userId, items: [] });
    const existingItem = cart.items.find((i) => i.productId.toString() === productId);
    if (existingItem) { return res.status(400).json({ message: "Product already in cart" }); }
    cart.items.push({ productId, quantity: quantity || 1 });
    await cart.save();
    res.json({ message: "Item added to cart", cart });
});

// get all carts with total price
export const getUserCart = CatchError(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id })
        .populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );
    res.json({ cart, totalPrice });
});

// delete one product from cart
export const removeFromCart = CatchError(async (req, res) => {
    const { productId } = req.params;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    res.json({ message: "Item removed", cart: await cart.save() });
});

// delete all products from cart
export const clearCart = CatchError(async (req, res) => {
    const cart = await Cart.findOneAndUpdate(
        { userId: req.user.id },
        { items: [] },
        { new: true }
    );
    res.json({ message: "Cart cleared", cart });
});

export const updateCartQuantity = CatchError(async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;
    if (!quantity || quantity <= 0) return res.status(400).json({ message: "Quantity must be greater than 0" });
    if (!(await Product.findById(productId))) return res.status(404).json({ message: "Product not found" });
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const item = cart.items.find(i => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Product not in cart" });
    item.quantity = quantity;
    await cart.save();
    res.json({ message: "Cart updated", cart });
});