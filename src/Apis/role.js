import axios from "axios";
// import { apiHeader } from "../common/apiHeader";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllRoles = async () => {
  try {
    const roles = await axios.get(`${apiUrl}/getroles`);
    return roles;
  } catch (error) {
    console.log(error, "Get Roles Error");
  }
};