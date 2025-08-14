import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import OTPInput from "react-otp-input";
import backGroundImage from "../assets/886556_55997-O8ISIA-423 1@3x.png";
import hoccoLogo from "../assets/Clip path group.png";
import formIcon from "../assets/Group 2171.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getOtp, logIn } from "../Apis/auth";
const AuthWithOTP = () => {
  const [step, setStep] = useState("enterPhone"); // 'enterPhone' | 'enterOtp'
  const [formData, setFormData] = useState({ email: "", keepLoggedIn: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setFormData({ email: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      keepLoggedIn: event.target.checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const response = await getOtp(formData);

      if (!response.data.error) {
        setStep("enterOtp");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP.");
    }finally{
      setLoading(false)
    }
  };

  const handleVerifyOtp = async () => {
    try {
       setLoading(true)
      const response = await logIn(formData, otp);

      if (!response.data.error) {
        // Optionally store token in localStorage or cookie
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("OTP verification failed.");
    }finally{
       setLoading(false)
    }
  };

  return (
    <>
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
          {/* Left Section */}
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
              {/* <Typography fontSize="1.5rem" fontWeight={600}>
                Ice Cream
              </Typography> */}
            </Box>
            <Box
              component="img"
              src={formIcon}
              alt="form"
              sx={{ width: isMobile ? 130 : 180, maxWidth: "100%" }}
            />
          </Stack>

          {/* Right Section */}
          <Stack spacing={2} sx={{ width: { xs: "100%", md: "60%" } }}>
            <Typography
              variant="h6"
              textAlign="center"
              fontSize={{ xs: 22, sm: 25 }}
            >
              Login with OTP
            </Typography>

            {/* {step === "enterPhone" ? (
              <>
                <TextField
                  fullWidth
                  placeholder="Enter Email"
                  name="email"
                  variant="outlined"
                  sx={{ background: "#fff", borderRadius: 1 }}
                  onChange={handleEmailChange}
                  value={formData.email}
                />
                <Stack direction={"row"} justifyContent={"center"}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked sx={{ color: "#fff" }} />}
                    onChange={handleCheckboxChange}
                    label="Keep Me Logged in"
                    name="keepLoggedIn"
                    value={formData.keepLoggedIn}
                  />
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#E8194F",
                    fontWeight: "bold",
                    ":hover": { backgroundColor: "#eee" },
                  }}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
              <Stack direction={"row"} justifyContent={"center"}>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderInput={(props) => <input {...props} />}
                  separator={<span style={{ color: "#fff" }}>-</span>}
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0 0.5rem",
                    fontSize: "1.5rem",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                  shouldAutoFocus
                  />
                  </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerifyOtp}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#E8194F",
                    fontWeight: "bold",
                    ":hover": { backgroundColor: "#eee" },
                  }}
                >
                  Verify OTP
                </Button>
              </>
            )} */}
            {step === "enterPhone" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                style={{display:"flex" , flexDirection:"column" ,  gap: "1rem"}}
              >
                <TextField
                  fullWidth
                  placeholder="Enter Email"
                  name="email"
                  variant="outlined"
                  sx={{ background: "#fff", borderRadius: 1 }}
                  onChange={handleEmailChange}
                  value={formData.email}
                />
                <Stack direction={"row"} justifyContent={"center"}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked sx={{ color: "#fff" }} />}
                    onChange={handleCheckboxChange}
                    label="Keep Me Logged in"
                    name="keepLoggedIn"
                    value={formData.keepLoggedIn}
                  />
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#E8194F",
                    fontWeight: "bold",
                    ":hover": { backgroundColor: "#eee" },
                  }}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerifyOtp();
                }}
                style={{display:"flex" , flexDirection:"column" ,  gap: "1rem"}}
              >
                <Stack direction={"row"} justifyContent={"center"}>
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} />}
                    separator={<span style={{ color: "#fff" }}>-</span>}
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 0.5rem",
                      fontSize: "1.5rem",
                      borderRadius: 4,
                      border: "1px solid #ccc",
                    }}
                    shouldAutoFocus
                  />
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#E8194F",
                    fontWeight: "bold",
                    ":hover": { backgroundColor: "#eee" },
                  }}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </form>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default AuthWithOTP;
