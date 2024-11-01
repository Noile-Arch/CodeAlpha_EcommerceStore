import PropTypes from "prop-types";

export const productPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired, // id must be a number
  title: PropTypes.string.isRequired, // title must be a string
  subtitle: PropTypes.string.isRequired, // subtitle must be a string
  image: PropTypes.string.isRequired, // image must be a string
}).isRequired; // Ensure the product object itself is required

export const myproductPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired, // Title must be a string and is required
  description: PropTypes.string.isRequired, // Description must be a string and is required
  price: PropTypes.number.isRequired, // Price must be a number and is required
  category: PropTypes.string.isRequired, // Category must be a string and is required
  image: PropTypes.string.isRequired, // Image URL must be a string and is required
  stock: PropTypes.number.isRequired, // Stock must be a number and is required
  ratingRate: PropTypes.number.isRequired, // Rating rate must be a number and is required
  ratingCount: PropTypes.number.isRequired, // Rating count must be a number and is required
});

export default {
  productPropTypes,
  myproductPropTypes,
};
