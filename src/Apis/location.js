import axios from "axios";
import { toast } from "react-toastify";
import { apiHeader } from "../common/apiHeader";

const apiUrl = import.meta.env.VITE_API_URL;

export const getLiveLocations = async (query) => {
  try {
    const locations = await axios.get(`${apiUrl}/getalllocations`, {
      params: { search: query },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return locations;
  } catch (error) {
    console.log(error, "Get Locations Error");
    toast.error(error.message);
  }
};

export const createLocation = async (data) => {
  try {
    const addLocation = await axios.post(
      `${apiUrl}/addlocation`,
      data,
      apiHeader()
    );
    toast.success("Location created");
    return addLocation;
  } catch (error) {
    console.log(error, "Create Location Error");
    toast.error(error.message);
  }
};

export const getOneLocation = async (id) => {
  try {
    const location = await axios.get(`${apiUrl}/getlocation/${id}`);
    return location;
  } catch (error) {
    console.log(error, "Get one Location Error");
    toast.error(error.message);
  }
};

export const updateLocation = async (id, formData) => {
  try {
    const updatedLocation = await axios.put(
      `${apiUrl}/updatelocationbyid/${id}`,
      formData
    );
    toast.success("Location Updated Successfully");
    return updatedLocation;
  } catch (error) {
    console.log(error, "Update Company Error");
    toast.error(error.message);
  }
};

export const deleteLocation = async (id) => {
  try {
    const deletedCompany = await axios.put(
      `${apiUrl}/deletelocationbyid/${id}`,
      {},
      apiHeader()
    );
    toast.success("Location Deleted");
    return deletedCompany;
  } catch (error) {
    console.log(error, "Delete Loaction Error");
    toast.error(error.message);
  }
};

export const getDeletedLocations = async () => {
  try {
    const deletedLocations = await axios.get(`${apiUrl}/getdeletedlocations`);
    return deletedLocations;
  } catch (error) {
    console.log(error, "Get Deleted Locations Error");
    toast.error(error.message);
  }
};

export const restoreLocation = async (id) => {
  try {
    const restoredLocation = await axios.put(
      `${apiUrl}/restorelocationbyid/${id}`,
      {}
    );
    return restoredLocation;
  } catch (error) {
    console.log(error, "Restore Location Error");
    toast.error(error.message);
  }
};

export const getLocationByCompany = async (query, compId) => {
  try {
    const location = await axios.get(
      `${apiUrl}/selectLocationByCompany/${compId}`,
      {
        params: { text: query },
        headers: apiHeader(),
      }
    );
    return location;
  } catch (error) {
    console.log(error, "Select Location By Company Error");
  }
};
