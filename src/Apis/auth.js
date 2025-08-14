import axios from "axios";
import { toast } from "react-toastify";
import { apiHeader } from "../common/apiHeader";

const apiUrl = import.meta.env.VITE_API_URL;

export const userSignUp = async (data) => {
  try {
    const user = await axios.post(`${apiUrl}/signup` , data);
    toast.success("User Registered SuccessFully")
    return user;
} catch (error) {
    console.log(error, "Sign Up User Error");
}
};
// export const userLogIn = async (data) => {
//     try {
//         const response = await axios.post(`${apiUrl}/logIn` , data , apiHeader);
//         toast.success("User Login SuccessFully")

//           const token = response.data.token;

//       localStorage.setItem("token", token); 


//     return user;
//   } catch (error) {
//     console.log(error, "Login User Error");
//   }
// };


export const getOtp = async (formData) => {
  try {
    const otp = await  axios.post(`${apiUrl}/getotp` , formData , { credentials: "include" });
    return otp;
  } catch (error) {
    console.log(error, "Get Otp Error");
  }
};


export const logIn = async (formData , otp) => {
  try {
    const loginWithotop = await axios.post(`${apiUrl}/login`, {
      email: formData.email,
      otp ,
      keepLoggedIn: formData.keepLoggedIn || false,
    });
    toast.success(loginWithotop?.data?.message)
    return loginWithotop;
  } catch (error) {
    console.log(error, "Login Error");
  }
};


