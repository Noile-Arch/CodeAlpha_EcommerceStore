import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// Create a context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Fetch data from the PostgreSQL database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("http://localhost:3000/api/products"); // Replace with your API endpoint
        const result = response;
        console.log(result);

        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

// Prop validation for the children prop
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
