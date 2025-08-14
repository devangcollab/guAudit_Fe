import axios from "axios";
import { apiHeader } from "../common/apiHeader";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
  try {
    const allUsers = await axios.get(`${apiUrl}/getusers`, apiHeader());
    return allUsers;
  } catch (error) {
    console.log(error, "Get Users Error");
  }
};
export const getLatestUsers = async () => {
  try {
    const allUsers = await axios.get(`${apiUrl}/getLatestUsers`);
    return allUsers;
  } catch (error) {
    console.log(error, "Get Users Error");
  }
};

export const createUser = async (data) => {
  try {
    const user = await axios.post(`${apiUrl}/createUser`, data);

    toast.success("User created successfully!"); 
    return user;
  } catch (error) {
    console.log(error, "Create Users Error");
    toast.error(error?.response?.data?.errors[0]?.msg);  
  }
};

export const getUserByLocationId = async (id) => {
  try {
    const user = await axios.get(`${apiUrl}/getUserByLocationId/${id}`);
    return user;
  } catch (error) {
    console.log(error, "Get User By Location Error");
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await axios.put(`${apiUrl}/deleteuserbyid/${id}`);
    toast.success("User Deleted Successfully")
    return user;
  } catch (error) {
    console.log(error);
  }
};


export const getOneUser = async (id) => {
  try {
    const user = await axios.get(`${apiUrl}/getuser/${id}`, apiHeader());
    return user;
  } catch (error) {
    console.log(error, "Get Users Error");
  }
};
export const updateUser = async (id , formData) => {
  try {
    const user = await axios.put(`${apiUrl}/updateuserbyid/${id}`,formData, apiHeader());
    toast.success("User Updated SuccessFully")
    return user;
  } catch (error) {
    console.log(error, "Get Users Error");
  }
};
export const getDeletedUsers = async () => {
  try {
    const user = await axios.get(`${apiUrl}/getDeletedUsers`, apiHeader());
    return user;
  } catch (error) {
    console.log(error, "Get Deleted Users Error");
  }
};

export const restoreUser = async (id) => {
  try {
    const restoredUser = await axios.put(
      `${apiUrl}/restoreUserById/${id}`,
      {}
    );
    return restoredUser;
  } catch (error) {
    console.log(error, "Restore User Error");
    toast.error(error.message);
  }
};