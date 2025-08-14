import axios from "axios";
import { toast } from "react-toastify";
import { apiHeader } from "../common/apiHeader";

const apiUrl = import.meta.env.VITE_API_URL;


export const addAnswerForm = async (formData) => {
  try {
    const data = await axios.post(`${apiUrl}/addform` , formData , apiHeader());
    return data;
  } catch (error) {
    console.log(error, "Add Answer Form Error");
  }
};
