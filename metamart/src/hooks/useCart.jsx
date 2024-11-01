import { useEffect, useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState("");

  // Load cart from localStorage on component mount
  useEffect(() => {
    const cartItems = localStorage.getItem("metamart-cart");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    // Debugging log
  }, []);

  // Add item to cart
  const addToCart = (data) => {
    const itemExists = cart.some((item) => item.id === data.id); // Check for existing item

    if (itemExists) {
      setNotifications("Item already exists in the cart!");
      console.log("Item already in cart:", data); // Debugging log
    } else {
      //   setCart((prevItems) => [...prevItems, data]);
      localStorage.setItem("metamart-cart", JSON.stringify([...cart, data]));
      console.log("Cart updated:", cart);
      setNotifications(`Item ${data.title} added to cart!`);
      console.log("Item added to cart:", data); // Debugging log
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("metamart-cart", JSON.stringify(updatedCart));

    setNotifications("Item removed from cart!");
    console.log("Cart after removal:", updatedCart);
  };

  return { cart, addToCart, notifications, removeFromCart };
};

export default useCart;
