import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import backGroundImage from "../assets/886556_55997-O8ISIA-423 1@3x.png";
import hoccoLogo from "../assets/Clip path group.png";
import formIcon from "../assets/Group 2171.png";
import { userLogIn, userSignUp } from "../Apis/auth";
import { useNavigate } from "react-router-dom";

const AuthWithPassWord = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password:"",
    keepLoggedIn:""
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleCheckboxChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      keepLoggedIn: event.target.checked,
    }));
  };

  const resetForm = () => {
  setFormData({
    name: "",
    email: "",
    phone: "",
    password: "",
    keepLoggedIn: false,
  });
};



 const handleSubmit = async () => {
  try {
    if (isSignUp) {
      await userSignUp(formData);
      setIsSignUp(false); // go to login
      resetForm();        // clear form data
    } else {
      await userLogIn(formData);
      navigate("/dashboard")
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <>
      {/* Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backGroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#00000080",
          backgroundBlendMode: "darken",
          zIndex: -1,
        }}
      />

      {/* Centered Auth Card */}
      <Stack justifyContent="center" alignItems="center" height="90vh" px={2}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: "100%", sm: 500, md: 700 },
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 3,
            background: "linear-gradient(to right, #E8194F, #C10B3B)",
            color: "#fff",
          }}
        >
          {/* Left Section (Logo & Image) */}
          <Stack
            spacing={2}
            alignItems="center"
            sx={{ width: { xs: "100%", md: "40%" }, textAlign: "center" }}
          >
            <Box>
              <Box
                component="img"
                src={hoccoLogo}
                alt="HOCCO Logo"
                sx={{ width: 150, mb: 1 }}
              />
              <Typography fontSize="1.5rem" fontWeight={600}>
                Ice Cream
              </Typography>
            </Box>
            <Box
              component="img"
              src={formIcon}
              alt="form"
              sx={{ width: isMobile ? 130 : 180, maxWidth: "100%" }}
            />
          </Stack>

          {/* Right Section (Form) */}
          <Stack spacing={2} sx={{ width: { xs: "100%", md: "60%" } }}>
            <Typography
              variant="h6"
              textAlign="center"
              fontSize={{ xs: 22, sm: 25 }}
            >
              {isSignUp ? "Sign Up | Register" : "Login"}
            </Typography>

            {isSignUp && (
              <TextField
                fullWidth
                label="Enter Name"
                name="name"
                variant="outlined"
                sx={{ background: "#fff", borderRadius: 1 }}
                onChange={handleChange}
                value={formData.name}
              />
            )}

            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              sx={{ background: "#fff", borderRadius: 1 }}
              onChange={handleChange}
              value={formData.email}
            />
    {isSignUp && 
            <TextField
            fullWidth
            label="Enter Phone no."
            name="phone"
            variant="outlined"
            sx={{ background: "#fff", borderRadius: 1 }}
            onChange={handleChange}
            value={formData.phone}
            />
        }
            <TextField
              fullWidth
              label="Enter Password"
              name="password"
              variant="outlined"
              sx={{ background: "#fff", borderRadius: 1 }}
              onChange={handleChange}
              value={formData.password}
            />
    {!isSignUp &&
            <FormControlLabel
            control={<Checkbox defaultChecked sx={{ color: "#fff" }} />}
            onChange={handleCheckboxChange}
            label="Keep Me Logged in"
            name="keepLoggedIn"
            value={formData.keepLoggedIn}
            />
        }

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#fff",
                color: "#E8194F",
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: "#eee",
                },
              }}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>

            <Typography
              variant="body2"
              sx={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => setIsSignUp((prev) => !prev)}
            >
              {isSignUp
                ? "Already have an Account? Login"
                : "Don't have an Account? Sign Up"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default AuthWithPassWord;
