import express from "express";

import { loginUser, registerUser } from "../controllers/authcontroller.js";
const router = express.Router();

// User/Admin login
router.post("/login", loginUser);

// User registration (public)
router.post("/register", registerUser);

export default router;
