import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  IconButton,
  Checkbox,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CompanyAutoComplete from "../common/CompanyAutoComplete";
import LocationAutoComplete from "../common/LocationAutoComplete";
import CategoryAutoComplete from "../common/CategoryAutoComplete";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate, useParams } from "react-router-dom";
import {
  createQuestion,
  getOneQuestion,
  updateQuestion,
} from "../../Apis/question";
import { toast } from "react-toastify";

const questionTypes = ["Options", "Descriptive", "Yes/No", "multiplechoice"];

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    compId: null,
    locId: null,
    categoryId: null,
    title: "",
    questions: [
      {
        question: "",
        type: "",
        prefAns: [],
        options: [""],
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleFormFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;

    // If question type is changed, reset options
    // if (field === "type" && value !== "Options") {
    //   updatedQuestions[index].options = [""];
    // }
    if (field === "type") {
      updatedQuestions[index].options = [""]; // Reset options
      updatedQuestions[index].prefAns = []; // Reset preferred answers
    }

    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: "", type: "", prefAns: [], options: [""] },
      ],
    }));
  };

  const removeQuestion = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options.push("");
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const removeOption = (qIndex, optIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
      (_, i) => i !== optIndex
    );
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handlePreferredAnswerChange = (qIndex, optIndex) => {
    const updatedQuestions = [...formData.questions];
    const question = updatedQuestions[qIndex];

    const optValue = question.options[optIndex];

    if (!Array.isArray(question.prefAns)) {
      question.prefAns = [];
    }

    if (question.prefAns.includes(optValue)) {
      question.prefAns = question.prefAns.filter((val) => val !== optValue);
    } else {
      question.prefAns.push(optValue);
    }

    setFormData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const handleYesNoPreferredChange = (qIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].prefAns = [value]; // Only one value allowed
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleSingleChoicePreferredChange = (qIndex, optIndex) => {
    const updatedQuestions = [...formData.questions];
    const optValue = updatedQuestions[qIndex].options[optIndex];
    updatedQuestions[qIndex].prefAns = [optValue];

    setFormData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const callApi = async () => {
    if (id) {
      const response = await getOneQuestion(id);
      setFormData({
        ...response.data.data,
        // compId: {
        //   label: response.data.data?.compId?.name,
        //   value: response.data.data?.compId?._id || "",
        // },
        // locId: {
        //   label: response.data.data?.locId?.locName,
        //   value: response.data.data?.locId?._id || "",
        // },
        categoryId: {
          label: response.data.data?.categoryId?.name,
          value: response.data.data?.categoryId?._id || "",
        },
      });
    }
  };

  useEffect(() => {
    callApi();
  }, [id]);

  const handleSubmit = async () => {
    //  if (!formData.compId) return toast.warning("Please select Company Name");
    //    if (!formData.locId) return toast.warning("Please Select Location Name");
    if (!formData.categoryId) return toast.warning("Please Select Category.");
    if (!formData.title) return toast.warning("Please Enter Title");

     for (let i = 0; i < formData.questions.length; i++) {
    const q = formData.questions[i];

    if (!q.question.trim()) {
      return toast.warning(`Please enter Question ${i + 1}`);
    }

    if (!q.type) {
      return toast.warning(`Please select Type for Question ${i + 1}`);
    }

    if (["Options", "multiplechoice"].includes(q.type)) {
      const hasValidOptions = q.options.some((opt) => opt.trim());
      if (!hasValidOptions) {
        return toast.warning(`Please add at least one option in Question ${i + 1}`);
      }

      if (!q.prefAns || q.prefAns.length === 0) {
        return toast.warning(`Please select at least one preferred answer in Question ${i + 1}`);
      }
    }

    if (q.type === "Yes/No" && (!q.prefAns || q.prefAns.length === 0)) {
      return toast.warning(`Please select preferred answer (Yes or No) for Question ${i + 1}`);
    }
  }

    setLoading(true); // Start loading

    const payload = {
      ...formData,
      // compId: formData?.compId?.value,
      // locId: formData?.locId?.value,
      categoryId: formData?.categoryId?.value,
    };

    try {
      if (id) {
        await updateQuestion(id, payload);
      } else {
        await createQuestion(payload);
      }
      navigate("/auditPage");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <Box
      sx={{
        m: 2,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        padding: "1rem",
      }}
    >
      <Grid container spacing={2}>
        {/* <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Company</Typography>
          <CompanyAutoComplete
            value={formData.compId}
            onChange={(value) => handleFormFieldChange("compId", value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Location</Typography>
          <LocationAutoComplete
            value={formData.locId}
            compId={formData?.compId?.value}
            onChange={(value) => handleFormFieldChange("locId", value)}
          />
        </Grid> */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Category</Typography>
          <CategoryAutoComplete
            value={formData.categoryId}
            onChange={(value) => handleFormFieldChange("categoryId", value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Title</Typography>
          <TextField
            size="small"
            fullWidth
            placeholder="Enter Title"
            value={formData.title}
            onChange={(e) => handleFormFieldChange("title", e.target.value)}
          />
        </Grid>

        {formData.questions.map((q, index) => (
          <React.Fragment key={index}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Question {index + 1}</Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="Enter question"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Type</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={q.type}
                  onChange={(e) =>
                    handleQuestionChange(index, "type", e.target.value)
                  }
                  label="Type"
                >
                  {questionTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {q.type === "multiplechoice" && (
              <Grid size={{ xs: 12, md: 12 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Options (Select Preferred Answers)
                </Typography>
                {q.options.map((opt, optIndex) => (
                  <Box
                    key={optIndex}
                    display="flex"
                    alignItems="center"
                    mb={1}
                    gap={1}
                  >
                    <Checkbox
                      checked={q.prefAns?.includes(opt)}
                      onChange={() =>
                        handlePreferredAnswerChange(index, optIndex)
                      }
                    />
                    <TextField
                      size="small"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value)
                      }
                      placeholder={`Option ${optIndex + 1}`}
                      fullWidth
                    />
                    <IconButton
                      color="success"
                      onClick={() => addOption(index)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removeOption(index, optIndex)}
                      disabled={q.options.length === 1}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Box>
                ))}
              </Grid>
            )}

            {q.type === "Descriptive" && (
              <Grid size={{ xs: 12, md: 12 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Descriptive Answer (User will write freely)
                </Typography>
              </Grid>
            )}

            {q.type === "Yes/No" && (
              <Grid size={{ xs: 12, md: 12 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Preferred Answer (Yes or No)
                </Typography>
                <Box display="flex" gap={2}>
                  {["Yes", "No"].map((val, i) => (
                    <Box key={val} display="flex" alignItems="center">
                      <Checkbox
                        checked={q.prefAns?.[0] === val}
                        onChange={() => handleYesNoPreferredChange(index, val)}
                      />
                      <Typography>{val}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}

            {q.type === "Options" && (
              <Grid size={{ xs: 12, md: 12 }} direction={"column"}>
                <Typography variant="subtitle1" gutterBottom>
                  Options (Select One Preferred Answer)
                </Typography>
                {q.options.map((opt, optIndex) => (
                  <Box
                    key={optIndex}
                    display="flex"
                    alignItems="center"
                    mb={1}
                    gap={1}
                  >
                    <Checkbox
                      checked={q.prefAns?.[0] === opt}
                      onChange={() =>
                        handleSingleChoicePreferredChange(index, optIndex)
                      }
                    />
                    <TextField
                      size="small"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value)
                      }
                      placeholder={`Option ${optIndex + 1}`}
                      fullWidth
                    />
                    <IconButton
                      color="success"
                      onClick={() => addOption(index)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removeOption(index, optIndex)}
                      disabled={q.options.length === 1}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Box>
                ))}
              </Grid>
            )}

            {index > 0 && (
              <Grid size={{ xs: 12, md: 12 }}>
                <Button
                  color="error"
                  variant="outlined"
                  size="medium"
                  onClick={() => removeQuestion(index)}
                >
                  Remove Question
                </Button>
              </Grid>
            )}
          </React.Fragment>
        ))}

        <Grid container>
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddCircleOutlineIcon />}
              onClick={addQuestion}
            >
              Add Question
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Stack direction={"row"} gap={2} justifyContent={"end"}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate("/auditPage")}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#E8194F" }}
          onClick={handleSubmit}
          disabled={loading} // disables while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Stack>
    </Box>
  );
};

export default QuestionForm;
