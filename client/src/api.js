import axios from "axios";

export const fetchProductList = async ({ pageParam = 0 }) => {
  const { data } = await axios(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`);
  return data;
};

export const fetchProduct = async (product_id) => {
  const { data } = await axios(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`);
  return data;
};

export const fetchRegister = async (formdata) => {
  const { response } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`, formdata);
  return response;
};

export const fetchLogin = async (formdata) => {
  const { response } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`, formdata);
  return response;
};
