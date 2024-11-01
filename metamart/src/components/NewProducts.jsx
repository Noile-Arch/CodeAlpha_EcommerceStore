import { useContext } from "react";
import { myproductPropTypes } from "../utils/PropTypes/proptypes";
import ProductCard from "./ProductCard";
import { DataContext } from "../context/dataContext";
import PropTypes from "prop-types";

const NewProducts = () => {
  const { data } = useContext(DataContext);
  return (
    <div className="w-full h-full px-10 pt-10">
      <div className="w-full h-[50px] bg-[rgba(255,200,35,0.81)]">
        <h1 className="w-full h-full flex justify-center items-center font-bold text-2xl">
          Top products
        </h1>
        <section className="w-full h-auto flex justify-center py-10 items-center gap-4 flex-wrap">
          {data.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </section>
      </div>
    </div>
  );
};
NewProducts.propTypes = {
  data: PropTypes.arrayOf(myproductPropTypes),
};
export default NewProducts;
