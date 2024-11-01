import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useEffect, useState } from "react";

const Cart = () => {
  const { cart } = useCart();
  const [cartLength, setCartLength] = useState(0);
  useEffect(() => {
    setCartLength(cart.length);
  }, [cart]);
  return (
    <div className=" h-full text-[gold]">
      <Link to={"/cart"} className=" h-full text-4xl relative ">
        <AiOutlineShoppingCart />
        <div className="w-full h-full absolute  inset-0 flex justify-end">
          <p className="w-[15px] h-[15px] bg-[#59d22d] text-[#000000] text-[12px] font-bold flex justify-center items-center rounded-full">
            {cartLength}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Cart;
