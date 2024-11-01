import express from "express";
import cors from "cors";
import "dotenv/config";
import updateProducts from "./utils/updateProducts.js";
import prisma from "./config/db.config.js";
import authRoutes from "./routes/authroutes.js";
import productroutes from "./routes/productRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route Configuration
app.use("/api/auth", authRoutes); // Use auth routes under /api/auth
app.use("/api", productroutes);

// Call the updateProducts function to set up routes
updateProducts(app, prisma);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
