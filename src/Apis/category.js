import axios from "axios";
import { toast } from "react-toastify";
import { apiHeader } from "../common/apiHeader";

const apiUrl = import.meta.env.VITE_API_URL;

export const createCategory = async (data) => {
  try {
    const addCategory = await axios.post(
      `${apiUrl}/addcategory`,
      data,
      apiHeader()
    );
    toast.success("Category created");
    return addCategory;
  } catch (error) {
    console.log(error, "Create Category Error");
    toast.error(error.message);
  }
};

export const getLiveCategories = async () => {
  try {
    const getLiveCategories = await axios.get(`${apiUrl}/getallcategories`);
    return getLiveCategories;
  } catch (error) {
    console.log(error, "Get Live Categories Error");
  }
};
export const getOneCategory = async (id) => {
  try {
    const category = await axios.get(`${apiUrl}/getOneCategory/${id}`);
    return category;
  } catch (error) {
    console.log(error, "Get One Categories Error");
  }
};
export const getDeletedCategories = async () => {
  try {
    const category = await axios.get(`${apiUrl}/getDeletedCategory`);
    return category;
  } catch (error) {
    console.log(error, "Get Deleted Categories Error");
  }
};

export const updateCategory = async (id , formData) => {
  try {
    const categories = await axios.put(
      `${apiUrl}/updatecategorybyid/${id}`,
      formData
    );
    toast.success("Category Updated SuccessFully");
    return categories;
  } catch (error) {
    console.log(error, "Update Category Error");
  }
};

export const deleteCategory = async (id) => {
  try {
    const categories = await axios.put(
      `${apiUrl}/deletecategorybyid/${id}`,
      {},
      apiHeader()
    );
    toast.success("Category Deleted SuccessFully");
    return categories;
  } catch (error) {
    console.log(error, "Delete Category Error");
  }
};


export const restoreCategory = async (id) => {
  try {
    const restoredCategory = await axios.put(
      `${apiUrl}/restorecatbyid/${id}`,
      {}
    );
    return restoredCategory;
  } catch (error) {
    console.log(error, "Restore Category Error");
    toast.error(error.message);
  }
};

export const getSelectedCategories = async (query) => {
  try {
    const category = await axios.get(`${apiUrl}/selectCategory`, {
      params: { text: query },
      headers: apiHeader(),
    });
    return category;
  } catch (error) {
    console.log(error, "Get Selected Category Error");
  }
};
