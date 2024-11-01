import axios from "axios";

const updateProducts = (app, prisma) => {
  // Function to fetch products from Fake Store API
  const fetchProductsFromAPI = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data; // Array of products
    } catch (error) {
      console.error("Error fetching products from Fake Store API:", error);
      return [];
    }
  };

  // Function to save product data to PostgreSQL using Prisma
  const saveProductToDB = async (product) => {
    const { title, description, price, category, image, ratingRate, ratingCount } = product;
    try {
      await prisma.product.create({
        data: {
          title,
          description,
          price,
          category,
          image,
          stock: 0, 
          ratingRate,  
          ratingCount, 
        },
      });
    } catch (error) {
      console.error("Error saving product to PostgreSQL:", error);
    }
  };

  // Function to delete all products using Prisma
  const deleteAllProducts = async () => {
    try {
      await prisma.product.deleteMany(); // Delete all records from the Product table
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  // Function to update product stock using Prisma
  const updateProductStock = async () => {
    try {
      const products = await prisma.product.findMany({
        select: { id: true }, 
      });

      const updatePromises = products.map(async (product) => {
        const randomStock = Math.floor(Math.random() * 100); // Generate random stock level (0-99)
        await prisma.product.update({
          where: { id: product.id },
          data: { stock: randomStock },
        });
      });
      await Promise.all(updatePromises); 
    } catch (error) {
      console.error("Error updating product stock:", error);
    }
  };

  // Route to fetch and save data
  app.get("/fetch", async (req, res) => {
    try {
      // Delete existing products before fetching new ones
      await deleteAllProducts();

      // Fetch products from Fake Store API
      const products = await fetchProductsFromAPI();

      // Loop through each product and save to DB
      for (let product of products) {
        await saveProductToDB({
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image, 
          ratingRate: product.rating?.rate || null,  
          ratingCount: product.rating?.count || null,
        });
      }

      // Update stock levels after saving new products
      await updateProductStock();

      res.send("Products saved and stock updated in PostgreSQL!");
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).send("Failed to process products");
    }
  });
};

export default updateProducts;
