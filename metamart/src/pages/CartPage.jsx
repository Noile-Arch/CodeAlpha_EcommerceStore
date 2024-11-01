import { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      const usd = cart.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      const ksh = Math.floor(usd * 130);

      setTotal(ksh.toLocaleString("en-US"));
    }
  }, [cart]);

  return (
    <>
      <div className="w-full lg:px-40 pt-[100px]">
        <h1 className="mx-4 text-[gold] text-xl bg-[#080808] text-center">Cart</h1>
        <div className=" flex sm:flex-row flex-col justify-around items-start pt-4 px-4 w-full">
          {/* Add custom scroll styling */}
          <div className="lg:w-[70%] lg:h-[600px] h-[500px] w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {cart && (
              <div className="w-full bg-green-300">
                {cart.map((item) => {
                  return <CartCard key={item.id} data={item} />;
                })}
              </div>
            )}
            {cart == 0 && (
              <div className="w-full flex flex-col justify-start mt-6 items-center">
                <div className="w-full flex flex-col justify-center items-center">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="empty cart"
                    className="rounded-full h-[200px]"
                  />
                  <h1 className="text-center p-2">Your cart is empty!</h1>
                  <h1 className="text-center p-4">
                    Browse our categories and discover our best deals!
                  </h1>
                </div>
                <div className="w-full flex justify-center items-center">
                  <Link
                    to={"/"}
                    className="w-[300px] text-center font-semibold text-lg py-3 px-4 bg-[#ff5e00] rounded-lg"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
          {cart >0 && (
            <div className="flex lg:w-[300px] sm:w-[500px] w-full lg:h-[400px] text-[gold] flex-col justify-center bg-[#090909] items-start p-4">
              <h1 className="w-full text-2xl py-3 border-b border-blue-400">
                Cart Summary
              </h1>
              <div className="flex w-full justify-between items-center ">
                <p className="py-4 font-bold text-lg">Subtotal</p>
                <h1 className="font-bold text-2xl">Ksh {total}</h1>
              </div>
              <h1 className="py-2 text-[#19ff19] hidden sm:block">
                Delivery fee not included yet
              </h1>
              <div className="w-full h-[100px] hidden sm:block rounded-lg border border-[#ffcd18]">
                <h1 className="bg-[rgba(255,217,0,0.72)] text-[#000000] rounded-tl-lg rounded-tr-lg px-4">
                  Free delivery
                </h1>
                <p className="p-4 ">
                  Metamart Express items are eligible for free delivery
                </p>
              </div>
              <button className="w-full py-3 font-bold text-white mt-6  rounded-lg border bg-[#ff7418]">
                <h1 className="">Checkout (Ksh {total})</h1>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
