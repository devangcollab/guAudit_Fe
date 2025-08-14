import axios from "axios";
import { toast } from "react-toastify";
import { apiHeader } from "../common/apiHeader";

const apiUrl = import.meta.env.VITE_API_URL;

export const getFormRecords = async () => {
  try {
    const filledForm = await axios.get(`${apiUrl}/getAllForms` , apiHeader());
    return filledForm;
  } catch (error) {
    console.log(error, "Get Filled Form Error");
  }
};

export const getAllForms = async () => {
  try {
    const filledForm = await axios.get(`${apiUrl}/getAllForms` , apiHeader());
    return filledForm;
  } catch (error) {
    console.log(error, "Get All Form Error");
  }
};


export const checkUserAssignment = async (userId, questionId) => {
  try {
    const response = await axios.get(`${apiUrl}/checkUserAssignment/${userId}`, {
      params: { questionId },
    });
    return response;
  } catch (error) {
    console.log(error, "Get User Assignment Error");
  }
};




export const updateAnswerForm = async (id, formData) => {
  try {
    const updatedForm = await axios.put(
      `${apiUrl}/updateForm/${id}`,
      formData , apiHeader()
    );
    toast.success("Answers Submit Successfully");
    return updatedForm;
  } catch (error) {
    console.log(error, "Update Form Error");
    toast.error(error.message);
  }
};


export const getSelectedAudits = async (text, locId) => {
  const res = await axios.get(`${apiUrl}/getSelectedAudits`, {
    params: { text, locId },
  });
  return res;
};


export const getAuditByQuestionId = async (id) => {
  const res = await axios.get(`${apiUrl}/getAuditByQuestionId/${id}`);
  return res;
};


export const getFilledForm = async () => {
  const res = await axios.get(`${apiUrl}/getCompletedForms` , apiHeader());
  return res;
};


