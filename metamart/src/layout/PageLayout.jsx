import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
const PageLayout = ({children}) => {
  return (
    <>
      <div className="w-full h-auto">
      <div className="w-full h-20 absolute ">
        <Navbar />
      </div>
        <main className="">{children}</main>
      </div>
    </>
  );
};
PageLayout.propTypes = {
    children: PropTypes.node.isRequired, 
  };
export default PageLayout;
