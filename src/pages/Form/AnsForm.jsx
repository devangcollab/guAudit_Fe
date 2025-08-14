// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Button,
//   TextField,
//   Radio,
//   RadioGroup,
//   Checkbox,
//   FormControlLabel,
//   FormLabel,
//   FormGroup,
//   useMediaQuery,
//   useTheme,
//   Stack,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { getOneQuestion } from "../../Apis/question";

// const AnsForm = () => {
//   const [question, setQuestion] = useState(null);
//   const [formData, setFormData] = useState({

//   });

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const callApi = async () => {
//     const response = await getOneQuestion(id);
//     console.log(response.data.data)
//     setQuestion(response.data.data);
//   };

//   useEffect(() => {
//     callApi();
//   }, [id]);

// const renderInputField = (que) => {
//   switch (que?.type?.toLowerCase()) {
//     case "yes/no":
//       return (
//         <>
//           <FormLabel>Select an option</FormLabel>
//           <RadioGroup row>
//             <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//             <FormControlLabel value="no" control={<Radio />} label="No" />
//           </RadioGroup>
//         </>
//       );

//     case "multiplechoice":
//       return (
//         <>
//           <FormLabel>Select multiple options</FormLabel>
//           <FormGroup row>
//             {que?.options?.map((opt, i) => (
//               <FormControlLabel key={i} control={<Checkbox />} label={opt} />
//             ))}
//           </FormGroup>
//         </>
//       );

//     case "options":
//       return (
//         <>
//           <FormLabel>Select one option</FormLabel>
//           <RadioGroup row>
//             {que?.options?.map((opt, i) => (
//               <FormControlLabel
//                 key={i}
//                 value={opt}
//                 control={<Radio />}
//                 label={opt}
//               />
//             ))}
//           </RadioGroup>
//         </>
//       );

//     case "descriptive":
//       return (
//         <>
//           <FormLabel>Your Answer</FormLabel>
//           <TextField
//             fullWidth
//             multiline
//             rows={3}
//             placeholder="Type your answer here..."
//           />
//         </>
//       );

//     default:
//       return <Typography color="error">Unknown question type</Typography>;
//   }
// };

// const handleSubmit = ()=> {

//     console.log("===")

// }

//   return (
//     <>
//       {question &&
//         question?.questions?.map((que, index) => (
//           <Card sx={{ maxWidth: "100%", p: 2, mb: 2 }} key={index}>
//             <CardContent>
//               <Typography variant="subtitle1" fontWeight="bold" mb={2}>
//                 {`Q${index + 1}. ${que?.question}`}
//               </Typography>

//               {/* File input + Add Remark */}
//               <Box display="flex" alignItems="center" gap={2} mb={2}>
//                 <Button variant="outlined" component="label">
//                   Choose File
//                   <input type="file" hidden />
//                 </Button>
//                 <Typography variant="body2" color="text.secondary">
//                   No file chosen
//                 </Typography>
//                 <Button variant="contained" color="error">
//                   Add Remark
//                 </Button>
//               </Box>

//               {/* Conditional answer inputs */}
//               {renderInputField(que)}
//             </CardContent>
//           </Card>
//         ))}

//         <Stack direction={"row"} justifyContent={"end"} gap={1} p={2}>
//             <Button variant="contained" color="error"> Cancel</Button>
//             <Button variant="contained" color="primary" onClick={handleSubmit}> Submit</Button>
//         </Stack>

//     </>
//   );
// };

// export default AnsForm;
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Radio,
  RadioGroup,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  useMediaQuery,
  useTheme,
  Stack,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getOneQuestion, updateQuestion } from "../../Apis/question";
import { addAnswerForm } from "../../Apis/ansForm";
import { toast } from "react-toastify";
import { updateAnswerForm } from "../../Apis/form";

const AnsForm = () => {
  const [questionData, setQuestionData] = useState(null);
  const [remarksVisibility, setRemarksVisibility] = useState({});
  const [remarksText, setRemarksText] = useState({});
  const [answers, setAnswers] = useState({});
  const [fileData, setFileData] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { id , formId } = useParams();

  const navigate = useNavigate();

  const callApi = async () => {
    const response = await getOneQuestion(id);
    setQuestionData(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, [id]);

  const toggleRemark = (index) => {
    setRemarksVisibility((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // const handleFileChange = async (index, e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const base64 = await toBase64(file);
  //     setFileData((prev) => ({
  //       ...prev,
  //       [index]: base64,
  //     }));
  //   }
  // };

  // const handleFileChange = async (index, e) => {
  //   const files = Array.from(e.target.files);
  //   const base64Files = await Promise.all(
  //     files.map(async (file) => ({
  //       name: file.name,
  //       base64: await toBase64(file),
  //     }))
  //   );

  //   setFileData((prev) => ({
  //     ...prev,
  //     [index]: base64Files,
  //   }));
  // };

  const handleFileChange = async (index, e) => {
    const files = Array.from(e.target.files);

    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFiles.length > 0) {
      toast.error("Only image files are allowed (jpg, png, etc.)");
      return;
    }

    const base64Files = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        base64: await toBase64(file),
      }))
    );

    setFileData((prev) => ({
      ...prev,
      [index]: base64Files,
    }));
  };

  const handleRemoveImage = (index, fileIndex) => {
    setFileData((prev) => {
      const updated = [...(prev[index] || [])];
      updated.splice(fileIndex, 1); // Remove selected image
      return {
        ...prev,
        [index]: updated,
      };
    });
  };

  const handleRemarkChange = (index, value) => {
    setRemarksText((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleCheckboxChange = (index, option) => {
    setAnswers((prev) => {
      const current = prev[index] || [];
      const updated = current.includes(option)
        ? current.filter((opt) => opt !== option)
        : [...current, option];
      return { ...prev, [index]: updated };
    });
  };

  const renderInputField = (que, index) => {
    switch (que?.type?.toLowerCase()) {
      case "yes/no":
        return (
          <>
            <FormLabel>Select an option</FormLabel>
            <RadioGroup
              row
              value={answers[index] || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </>
        );

      case "multiplechoice":
        return (
          <>
            <FormLabel>Select multiple options</FormLabel>
            <FormGroup row>
              {que?.options?.map((opt, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={answers[index]?.includes(opt) || false}
                      onChange={() => handleCheckboxChange(index, opt)}
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
          </>
        );

      case "options":
        return (
          <>
            <FormLabel>Select one option</FormLabel>
            <RadioGroup
              row
              value={answers[index] || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            >
              {que?.options?.map((opt, i) => (
                <FormControlLabel
                  key={i}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          </>
        );

      case "descriptive":
        return (
          <>
            <FormLabel>Your Answer</FormLabel>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Type your answer here..."
              value={answers[index] || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </>
        );

      default:
        return <Typography color="error">Unknown question type</Typography>;
    }
  };

  let user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const handleSubmit = async () => {
    try {
      const errors = [];

      const formData = questionData.questions.map((que, index) => {
        const answer =
          answers[index] || (que.type === "multiplechoice" ? [] : "");
        const remark = remarksText[index] || "";
        // const attachment = fileData[index] || "";
        const attachment =
          fileData[index]?.map((f) => `${f.name}::${f.base64}`).join(";;;") ||
          "";

        // Validation: Check if answer is empty
        if (
          (que.type === "descriptive" && !answer.trim()) ||
          (["options", "yes/no"].includes(que.type.toLowerCase()) && !answer) ||
          (que.type === "multiplechoice" && answer.length === 0)
        ) {
          errors.push(`Please answer Question ${index + 1}`);
        }

        return {
          question: que.question,
          type: que.type,
          prefAns: que.prefAns,
          answer,
          remark,
          attachment,
        };
      });

      if (errors.length > 0) {
        toast.error(errors.join("\n")); // Or use toast/error dialog
        return;
      }

      const finalPayload = {
        // compId: questionData.compId,
        // locId: questionData.locId,
        categoryId: questionData.categoryId,
        // title: questionData.title,
        formData,
      };

      // await addAnswerForm(finalPayload);

      // await updateAnswerForm(finalPayload)

      await updateAnswerForm(formId, {
        status: "completed",
         categoryId: questionData.categoryId,
         formData
      });

      navigate("/fillForm");
    } catch (error) {
      console.log("Form submission error:", error.message);
    }
  };

  return (
    <>
      {questionData &&
        questionData?.questions?.map((que, index) => (
          <Card sx={{ maxWidth: "100%", p: 2, mb: 2 }} key={index}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                {`Q${index + 1}. ${que?.question}`}
              </Typography>

              {/* File input + Add Remark */}
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Button variant="outlined" component="label">
                  Choose Files
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e)}
                  />
                </Button>

                {/* <Typography variant="body2" color="text.secondary">
                  {fileData[index] && fileData[index].length > 0
                    ? fileData[index].map((file) => file.name).join(", ")
                    : "No files chosen"}
                </Typography> */}
                <Box display="flex" flexDirection="column" gap={1}>
                  {fileData[index] && fileData[index].length > 0 ? (
                    fileData[index].map((file, i) => (
                      <Box
                        key={i}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          border: "1px solid #ccc",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          maxWidth: 300,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "200px",
                          }}
                          title={file.name}
                        >
                          {file.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveImage(index, i)}
                          sx={{ color: "red" }}
                        >
                          ✕
                        </IconButton>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No files chosen
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => toggleRemark(index)}
                >
                  {remarksVisibility[index] ? "Hide Remark" : "Add Remark"}
                </Button>
              </Box>

              {/* Show Remark Input */}
              {remarksVisibility[index] && (
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Remark"
                  placeholder="Write your remark here..."
                  value={remarksText[index] || ""}
                  onChange={(e) => handleRemarkChange(index, e.target.value)}
                  sx={{ mb: 2 }}
                />
              )}

              {/* Conditional answer inputs */}
              {renderInputField(que, index)}
            </CardContent>
          </Card>
        ))}

      <Stack direction={"row"} justifyContent={"end"} gap={1} p={2}>
        <Button variant="contained" color="error" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default AnsForm;
