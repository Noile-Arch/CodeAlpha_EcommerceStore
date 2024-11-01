import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import useCart from "../hooks/useCart";

const CartCard = ({ data }) => {
    const {removeFromCart } = useCart();
  const [price, setPrice] = useState(null);
  useEffect(() => {
    if (data) {
      const usd = data.price;
      const ksh = Math.floor(usd * 130);
      setPrice(ksh.toLocaleString("en-US"));
    }
  }, [data]);
  const removeItemFromCart = () => {
    removeFromCart(data.id);
    window.location.reload();
  };
  return (
    <>
      <div className="w-full h-[full] p-4 bg-[#131211]">
        <div className="w-full h-full flex flex-col justify-center items-start py-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-4">
              <img
                src={data.image}
                alt="data.title"
                className="w-[80px] object-contain rounded-2xl bg-white h-[80px]"
              />
              <div className=" flex flex-col justify-start items-start">
                <p className="text-white line-clamp-1">{data.title}</p>
                {data.stock > 0 ? (
                  <p className=" text-[#2ff1ff] font-bold italic">In stock : {data.stock}</p>
                ) : (
                  <p className="font-bold">Out of stock</p>
                )}
              </div>
            </div>
            <div className="w-[30%] flex justify-end items-center">
              <h1 className="font-semibold text-xl">Ksh {price}</h1>
            </div>
          </div>
          <div className="py-4 flex justify-between items-center">
            <button className="text-[gold] text-xl font-semibold flex justify-center items-center gap-2"onClick={removeItemFromCart}>
              <MdOutlineDeleteOutline className="text-2xl" />
              <h1 className="">Remove</h1>
            </button>
          </div>
        </div>
        <hr className="" />
      </div>
    </>
  );
};
CartCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ratingRate: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};
export default CartCard;
