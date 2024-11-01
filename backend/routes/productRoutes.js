import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductStock,
  deleteProduct,
  searchProductsByTitle,
  getProductsByCategory,
  addToCart,
  countProducts,
  countProductsByCategory,
} from "../controllers/productController.js";

import { protect, isAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

// User/Admin login is handled in authRoutes, so it's not repeated here

// Admin routes
router.post("/product", protect, isAdmin, createProduct);
router.put("/product/:id", protect, isAdmin, updateProductStock);
router.delete("/product/:id", protect, isAdmin, deleteProduct);

// User routes
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/products/search", searchProductsByTitle);
router.get("/product/category/:category", getProductsByCategory);
router.post("/product/addtocart", protect, addToCart); // User can register for an event

export default router;
