import axios from "axios";

const BASE_URL = "http://localhost:3050";

export const getAllCategories = () => {
  axios
    .get(`${BASE_URL}/api/categories/`)
    .then(result => {
      console.log(result.data);
    })
    .catch(err => console.log(err));
};
