import ProductCarousel from "../components/carousel";

import NewProducts from "../components/NewProducts";

const HomePage = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-start ">
      <div className="">
        <ProductCarousel />
      </div>
      <div className="">
        <NewProducts />
      </div>
    </div>
  );
};

export default HomePage;
