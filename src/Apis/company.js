import axios from "axios";
import { toast } from "react-toastify";
import { apiHeader } from "../common/apiHeader";

const apiUrl = import.meta.env.VITE_API_URL;

export const getLatestCompanies = async () => {
  try {
    const latestCompanies = await axios.get(`${apiUrl}/getLatestCompanies`, apiHeader());
    return latestCompanies;
  } catch (error) {
    console.log(error, "Get Latest Companies Error");
  }
};

export const getLiveCompanies = async () => {
  try {
    const liveCompanies = await axios.get(`${apiUrl}/getallcomps` , apiHeader());
    return liveCompanies;
  } catch (error) {
    console.log(error, "Get Live Companies Error");
  }
};

export const getDeletedCompanies = async () => {
  try {
    const deletedCompanies = await axios.get(`${apiUrl}/getdeletedcomps`);
    return deletedCompanies;
  } catch (error) {
    console.log(error, "Get Deleted Companies Error");
  }
};

export const createCompany = async (data) => {
  try {
    const addCompany = await axios.post(`${apiUrl}/addcomp`, data, apiHeader());
    toast.success("Company created");
    return addCompany;
  } catch (error) {
    console.log(error, "Create Companies Error");
    toast.error(error.response.data.message);
  }
};

export const getOneCompany = async (id) => {
  try {
    const company = await axios.get(`${apiUrl}/getCompany/${id}`);
    return company;
  } catch (error) {
    console.log(error, "Get one Company Error");
    toast.error(error.message);
  }
};

export const updateCompany = async (id, formData) => {
  try {
    const updatedCompany = await axios.put(
      `${apiUrl}/updatecompbyid/${id}`,
      formData , apiHeader()
    );
    return updatedCompany;
  } catch (error) {
    console.log(error, "Update Company Error");
   toast.error(error.response.data.message);
  }
};

export const deleteCompany = async (id) => {
  try {
    const deletedCompany = await axios.put(
      `${apiUrl}/deletecompbyid/${id}`,
      {},
      apiHeader()
    );
    return deletedCompany;
  } catch (error) {
    console.log(error, "Delete Company Error");
    toast.error(error.message);
  }
};

export const restoreCompany = async (id) => {
  try {
    const restoredCompany = await axios.put(
      `${apiUrl}/restorecompbyid/${id}`,
      {}
    );
    return restoredCompany;
  } catch (error) {
    console.log(error, "Restore Company Error");
    toast.error(error.message);
  }
};

export const getSelectedCompanies = async (query) => {
  try {
    const company = await axios.get(`${apiUrl}/selectCompany`, {
      params: { text: query },
      headers: apiHeader(),
    });
    return company;
  } catch (error) {
    console.log(error, "Get Selected Companies Error");
  }
};
