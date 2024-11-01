import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { MdAddShoppingCart } from "react-icons/md";
import useCart from "../hooks/useCart";

const ProductPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [price, setPrice] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async (productId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/${productId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      const usd = data.price;
      const ksh = Math.floor(usd * 130);
      setPrice(ksh.toLocaleString("en-US"));
    }
  }, [data]);

  const addItemToCart = () => {
    addToCart(data);
    window.location.reload();
  };

  return (
    <>
      {data && (
        <div className="text-white w-full  pt-[100px] lg:px-40 md:px-10 px-4">
          <div className="w-full h-full flex flex-wrap justify-around items-center lg:gap-20 gap-6">
            <div className="lg:w-[40%] h-[500px]  sm:w-[40%] sm:h-[70%] lg:h-[80%] bg-[#ffffff] flex justify-center items-center rounded-[20px]">
              <img
                src={data.image}
                alt={data.title}
                className="lg:object-contain object-cover rounded-[20px]"
              />
            </div>
            <div className="flex-1 h-[80%] bg-[#100c0c] p-4 text-[gold]">
              <div className="w-full h-full block gap-2">
                <h1 className="text-3xl my-2 line-clamp-2 font-semibold ">
                  {data.title}
                </h1>
                <hr />
                <div className="w-full block">
                  <p className="my-2 ">{data.description}</p>
                  <h1 className="font-bold text-2xl py-4 ">Ksh {price}</h1>
                  {data.stock > 0 ? (
                    <p className=" text-[#2ff1ff] font-bold italic">In stock</p>
                  ) : (
                    <p className="font-bold">Out of stock</p>
                  )}
                  <p className="">
                    + delivery from KSh 69 (free delivery if order above KSh
                    1,999)
                  </p>
                  <div className="flex justify-start items-center py-8">
                    <StarRating rating={data.ratingRate} />
                    <p className=""></p>
                  </div>
                </div>
                <div className="w-full">
                  <button
                    className="w-full bg-[#ff8800] text-lg font-bold text-[white] py-4 px-4 rounded-lg flex justify-center items-center"
                    onClick={addItemToCart}
                  >
                    <MdAddShoppingCart className="text-2xl" />
                    <div className="flex-1 flex justify-center items-center">
                      Add to Cart
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
