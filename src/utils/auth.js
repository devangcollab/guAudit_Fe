// src/utils/auth.js

export const getLoggedInUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    const user = JSON.parse(userStr);
    return user;
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return null;
  }
};

export const isSuperAdmin = () => getLoggedInUser()?.role === "SuperAdmin";
export const isAdmin = () => getLoggedInUser()?.role === "Admin";
export const isUser = () => getLoggedInUser()?.role === "User";

