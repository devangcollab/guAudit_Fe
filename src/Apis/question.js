import axios from "axios";
import { toast } from "react-toastify";
import { apiHeader } from "../common/apiHeader";

const apiUrl = import.meta.env.VITE_API_URL;

export const getLiveQuestions = async () => {
  try {
    const liveQuestions = await axios.get(`${apiUrl}/getallquestions`);
    return liveQuestions;
  } catch (error) {
    console.log(error, "Get Live Questions Error");
  }
};

export const getDeletedQuestions = async () => {
  try {
    const deletedQuestion = await axios.get(`${apiUrl}/getDeletedquestions`);
    return deletedQuestion;
  } catch (error) {
    console.log(error, "Get Deleted Questions Error");
  }
};

export const createQuestion = async (data) => {
  try {
    const addQuestion = await axios.post(
      `${apiUrl}/addquestion`,
      data,
      apiHeader()
    );
    toast.success("Question Added.");
    return addQuestion;
  } catch (error) {
    console.log("Create Question Error", error);


    // Check for MongoDB duplicate key error (code 11000)
    if (error.response?.data?.code === 11000 || error.code === 11000) {
      toast.error("Title already exists. Please use a unique title.");
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to add question.");
    }
  }
};

export const getOneQuestion = async (id) => {
  try {
    const question = await axios.get(`${apiUrl}/getQuestionById/${id}`);
    return question;
  } catch (error) {
    console.log(error, "Get one question Error");
    toast.error(error.message);
  }
};

export const updateQuestion = async (id, formData) => {
  try {
    const updatedQuestion = await axios.put(
      `${apiUrl}/updatequestionbyid/${id}`,
      formData
    );
    toast.success("Question Updated SuccessFully");
    return updatedQuestion;
  } catch (error) {
    console.log(error, "Update Question Error");
    toast.error(error.message);
  }
};

export const deleteQuestion = async (id) => {
  try {
    const deletedQuestion = await axios.put(
      `${apiUrl}/deletequestionbyid/${id}`,
      {},
      apiHeader()
    );
    toast.success("Question Deleted Successfully");
    return deletedQuestion;
  } catch (error) {
    console.log(error, "Delete Question Error");
    toast.error(error.message);
  }
};

export const restoreQuestion = async (id) => {
  try {
    const restoredQuestion = await axios.put(
      `${apiUrl}/restorequestionbyid/${id}`,
      {}
    );
    toast.success("Question Restored SuccessFully");
    return restoredQuestion;
  } catch (error) {
    console.log(error, "Restore Question Error");
    toast.error(error.message);
  }
};
export const assignQuestion = async (id, userIds) => {
  try {
    const assignedQuestion = await axios.put(
      `${apiUrl}/assignQuestions/${id}`,
      {
        assignedTo: userIds,
        status: "assigned",
      }
    );
    toast.success("Question Assign SuccessFully");
    return assignedQuestion;
  } catch (error) {
    console.log(error, "Assign Question Error");
    toast.error(error.message);
  }
};

//for Question for Assinged user
export const userAssignedQuestion = async () => {
  try {
    const qusetionForUser = await axios.get(
      `${apiUrl}/userAssignQuestions`,
      apiHeader()
    );
    return qusetionForUser;
  } catch (error) {
    console.log(error, "Get Question For Answer Error");
    toast.error(error.message);
  }
};
export const getAssignedUserIdsByQuestionId = async (id) => {
  try {
    const qusetionForUser = await axios.get(
      `${apiUrl}/getAssignedUserIds/${id}`
    );
    return qusetionForUser;
  } catch (error) {
    console.log(error, "Get Question For Answer Error");
    toast.error(error.message);
  }
};

export const getAuditData = async () => {
  try {
    const auditData = await axios.get(`${apiUrl}/getAuditData`, apiHeader());
    return auditData;
  } catch (error) {
    console.log(error, "Get Audit Data Error");
    toast.error(error.message);
  }
};
