import { getToken } from "../utils/Cookies.js";

const baseUrl = "http://localhost:8090";
const productApi = {
  get: async () => {
    try {
      let product = await fetch(`${baseUrl}/products`);
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  post: async (data) => {
    console.log(data);

    try {
      let product = await fetch(`${baseUrl}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`, // Assuming getToken() returns a valid token.
        },
        body: data, // Pass FormData directly without setting content-type.
      });
      let res = await product.json();
      return res;
    } catch (error) {
      console.error("Error posting product:", error);
      return null; // Return null or an appropriate error object.
    }
  },
  getById: async (id) => {
    try {
      let product = await fetch(`${baseUrl}/products/${id}`);
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  patch: async (id, data) => {
    try {
      let product = await fetch(`${baseUrl}/products/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      let product = await fetch(`${baseUrl}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      let res = await product.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default productApi;
