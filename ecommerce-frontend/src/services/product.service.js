import axios from "axios";

const API = "http://localhost:3000/api/products";

export const getProducts = (params) => axios.get(API, { params });

export const createProduct = (formData) => axios.post(API, formData);

export const updateProduct = (id, formData) =>
  axios.put(`${API}/${id}`, formData);

export const deleteProduct = (id) => axios.delete(`${API}/${id}`);
