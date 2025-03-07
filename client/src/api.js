import axios from "axios";

export const fetchProductList = async () => {
  const { data } = await axios("http://localhost:5000/product");
  return data;
};
