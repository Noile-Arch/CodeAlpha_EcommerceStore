import { Link } from "react-router-dom";
import Search from "./Search";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <div className="w-full h-[100px] bg-black/80 backdrop-blur-sm z-50 absolute inset-0">
      <div className="w-full h-full flex xl:justify-around justify-around items-center  ">
        <Link
          to={"/"}
          className="flex justify-center items-center gap-4 text-white"
        >
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-[60px] h-[60px] rounded-full"
          />
          <h1 className="text-2xl font-bold text-[gold] italic">MetaMart</h1>
        </Link>
        <div className="md:flex hidden font-semibold justify-center items-center gap-10">
          <Link to={"/men"}>Men</Link>
          <Link to={"/women"}>Women</Link>
          <Link to={"/electronics"}>Electronics</Link>
          <Link to={"/jewelery"}>Jewelery</Link>
        </div>
        <div className="w-auto flex justify-end items-center gap-10">
          <Search />
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
