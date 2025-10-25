# E-commerce Node.js API

A modular, production-ready REST API for an E-commerce platform built with Node.js and Express, featuring authentication, product/catalog management, cart, wishlist, orders, and payments. Includes file upload handling, validation, and centralized error handling.

## Tech Stack
- Node.js, Express
- MongoDB + Mongoose
- JWT Authentication
- Multer for file uploads
- Validation middleware
- Centralized error handling utilities

## Project Structure
```
E-commerce_Nodejs/
├─ main.js                  # App bootstrap and server start
├─ package.json
├─ DataBase/
│  ├─ db_connection.js      # Mongoose connection
│  └─ models/
│     ├─ userModel.js
│     ├─ product.Model.js
│     ├─ category.Model.js
│     ├─ subCategoryModel.js
│     ├─ cartModel.js
│     ├─ wishlistModel.js
│     ├─ orderModel.js
│     └─ paymentModel.js
├─ src/
│  ├─ MiddleWare/
│  │  ├─ auth.middleware.js
│  │  ├─ adminMiddleware.js
│  │  ├─ Multer.js
│  │  └─ validation.js
│  ├─ Modules/
│  │  ├─ Auth/
│  │  │  ├─ auth.controller.js
│  │  │  ├─ auth.routes.js
│  │  │  └─ auth.validation.js
│  │  ├─ users/
│  │  │  ├─ userController.js
│  │  │  ├─ userRoutes.js
│  │  │  └─ user.validation.js
│  │  ├─ product/
│  │  │  ├─ product.Controller.js
│  │  │  └─ product.routes.js
│  │  ├─ categories/
│  │  │  ├─ categoryController.js
│  │  │  └─ categoryRoutes.js
│  │  ├─ subCategories/
│  │  │  ├─ subCategory.controller.js
│  │  │  └─ subCategories.router.js
│  │  ├─ cart/
│  │  │  ├─ cartController.js
│  │  │  └─ cartRoute.js
│  │  ├─ wishlist/
│  │  │  ├─ wishlistController.js
│  │  │  └─ wishlistRoute.js
│  │  ├─ orders/
│  │  │  ├─ ordersController.js
│  │  │  ├─ ordersRoute.js
│  │  │  └─ orderValidation.js
│  │  └─ payment/
│  │     ├─ paymentController.js
│  │     └─ paymentRoutes.js
│  └─ utils/
│     ├─ token/
│     │  └─ token.js
│     ├─ hashing/
│     │  ��─ hashing.js
│     ├─ encryption/
│     │  └─ encryption.js
│     ├─ email/
│     │  ├─ sendEmail.js
│     │  ├─ generateHTML.js
│     │  └─ emailEvents.js
│     ├─ error-handling/
│     │  └─ notFoundHandler.js
│     ├─ CatchAyncError.js
│     ├─ CreateError.js
│     └─ globalMiddelwareHandling.js
└─ uploads/
   └─ products/             # Uploaded product images
```

## Setup
1. Prerequisites:
   - Node.js >= 18
   - MongoDB instance (local or cloud)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an .env file in the project root with the following variables (adjust as needed):
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-strong-secret
   JWT_EXPIRES_IN=7d
   # File uploads
   UPLOADS_DIR=uploads
   # Email (if used by auth flows)
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_user
   SMTP_PASS=your_pass
   SMTP_FROM="Shop <no-reply@example.com>"
   ```

4. Run the server:
   ```bash
   npm start
   ```
   Or with nodemon (if configured):
   ```bash
   npm run dev
   ```

## Scripts
Check package.json for available scripts. Common ones:
- npm start — start production server
- npm run dev — start with auto-reload (nodemon)

## API Overview
Below is a high-level overview inferred from the modules. Exact request/response shapes may vary; check controllers/routes for details.

- Auth (/api/auth)
  - POST /register — create user account
  - POST /login — obtain JWT
  - Possibly: email verification, password reset

- Users (/api/users)
  - GET /me — get current user
  - PATCH /me — update profile
  - Admin: user management

- Categories (/api/categories)
  - GET / — list categories
  - POST / — create category (admin)
  - PATCH /:id — update category (admin)
  - DELETE /:id — delete category (admin)

- Subcategories (/api/subcategories)
  - GET / — list subcategories
  - POST / — create subcategory (admin)

- Products (/api/products)
  - GET / — list products with filters/pagination
  - GET /:id — get product details
  - POST / — create product (admin, supports images via Multer)
  - PATCH /:id — update product (admin)
  - DELETE /:id — delete product (admin)

- Cart (/api/cart)
  - GET / — get current user cart
  - POST /add — add item to cart
  - PATCH /update — update item quantity
  - DELETE /remove/:productId — remove item
  - DELETE /clear — clear cart

- Wishlist (/api/wishlist)
  - GET / — list wishlist items
  - POST / — add product to wishlist
  - DELETE /:productId — remove product from wishlist

- Orders (/api/orders)
  - GET / — list user orders; Admin can list all
  - POST / — create order from cart
  - GET /:id — order details
  - PATCH /:id/status — update status (admin)

- Payment (/api/payments)
  - POST /checkout — initiate payment
  - POST /webhook — payment gateway webhook

## Middleware
- auth.middleware.js — JWT verification and role-based access
- adminMiddleware.js — ensures user has admin role
- Multer.js — file upload configuration for images
- validation.js — schema validation for requests
- globalMiddelwareHandling.js — central error handler

## Models
Mongoose models for core resources: User, Product, Category, SubCategory, Cart, Wishlist, Order, Payment. See DataBase/models for field definitions and indexes.

## File Uploads
- Product images are stored under uploads/products
- Ensure the folder exists and the process has write permissions
- Multer is used for handling multipart/form-data

## Environment & Security Notes
- Always set a strong JWT_SECRET and rotate periodically
- Use HTTPS in production
- Validate all inputs using the provided validation middleware
- Limit file upload size and MIME types in Multer configuration
- Configure CORS as needed

## Running in Development
- Seed data scripts (if any) can be added under a scripts/ folder
- Use a .env.development file for dev values
- Nodemon recommended for fast iteration

## Deployment
- Set environment variables on the host/platform
- Build a production process manager profile (e.g., pm2) if desired
- Point your reverse proxy (Nginx/Apache) to the Node app
- Serve uploads directory as static if needed (Express static or proxy config)

## Troubleshooting
- Database connection failures: verify MONGODB_URI and network access
- 401/403 responses: confirm Authorization header with a valid Bearer JWT
- Upload errors: check Multer config and uploads directory permissions
- 404: verify route base path mounting in main.js

## License
This project is provided as-is. Add a suitable open-source license if you plan to distribute.
