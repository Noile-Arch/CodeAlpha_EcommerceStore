import prisma from "../config/db.config.js";

export const newProduct = async (req, res) => {
  try {
    const { title, price, description, category, image, stock } = req.body;

    // Prepare the product data
    const data = {
      title,
      price: parseFloat(price),
      description,
      category,
      image,
      stock: parseInt(stock, 10),
    };

    // Call the createProduct function
    const product = await createProduct(data);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

export default newProduct;

// Add item to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming user is set in req.user from your protect middleware

  try {
    // Check if the item already exists in the cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingCartItem) {
      // Update quantity if the item already exists
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });

      return res.status(200).json({
        message: "Cart updated successfully",
        cartItem: updatedCartItem,
      });
    } else {
      // Create a new cart item if it does not exist
      const newCartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });

      return res.status(201).json({
        message: "Item added to cart successfully",
        cartItem: newCartItem,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new product
export async function createProduct(data) {
  return await prisma.product.create({
    data,
  });
}

// Fetch all products with optional pagination and filtering
export const getAllProducts = async (req, res) => {
  const { skip = 0, take = 15, category } = req.query; // Get parameters from the query

  const where = category ? { category } : {};

  try {
    const products = await prisma.product.findMany({
      where,
      skip: Number(skip),
      take: Number(take),
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch a product by ID
export async function getProductById(req, res) {
  try {
    const id = req.params.id;

    const product = await prisma.product.findUnique({
      where: { id: String(id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
    console.log(product);
    // Send back the product data
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Update product stock
export async function updateProductStock(id, stock) {
  return await prisma.product.update({
    where: { id: Number(id) },
    data: { stock },
  });
}

// Delete a product
export async function deleteProduct(id) {
  return await prisma.product.delete({
    where: { id: String(id) },
  });
}

// Search products by title (case insensitive)
export async function searchProductsByTitle(req, res) {
  try {
    const { query } = req.query;
    const skip = parseInt(req.query.skip) || 0;
    const take = parseInt(req.query.take) || 10;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      skip,
      take,
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.json(products); // Return the products found
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
}

// Fetch products by category
export async function getProductsByCategory(req, res) {
  const categoryMapping = {
    electronics: "electronics",
    jewelery: "jewelery",
    "mens-clothing": "men's clothing", // Map to the exact value stored in your database
    "womens-clothing": "women's clothing",
  };

  try {
    const categoryParam = req.params.category;
    const category = categoryMapping[categoryParam];
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const products = await prisma.product.findMany({
      where: { category },
      skip: parseInt(req.query.skip) || 0,
      take: parseInt(req.query.take) || 10,
    });

    return res.json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
}

// Count total products (for pagination)
export async function countProducts() {
  return await prisma.product.count();
}

// Count products by category
export async function countProductsByCategory(category) {
  return await prisma.product.count({
    where: { category },
  });
}

// Export all functions
// export const productService = {
//   createProduct,
//   getAllProducts,
//   getProductById,
//   updateProductStock,
//   deleteProduct,
//   searchProductsByTitle,
//   getProductsByCategory,
//   countProducts,
//   countProductsByCategory,
// };
