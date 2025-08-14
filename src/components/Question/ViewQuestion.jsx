import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneQuestion } from "../../Apis/question";

const ViewQuestion = () => {
  const [question, setQuestion] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { id } = useParams();
  const navigate = useNavigate()

  const callApi = async () => {
    const response = await getOneQuestion(id);

    setQuestion(response.data.data);
  };

  useEffect(() => {
    callApi();
  }, [id]);


  return (
    <>
      {question && (
        <>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <Typography variant={"h4"} fontWeight={600}>
                {question.title && question.title.toUpperCase()}
              </Typography>
              {/* <Typography variant={"h6"} fontWeight={600}>
                Company : {question.compId && question.compId.name}
              </Typography>
              <Typography variant={"h6"} fontWeight={600}>
                Location : {question.locId && question.locId.locName}
              </Typography> */}
              <Typography variant={"h6"} fontWeight={600}>
                Category : {question.categoryId && question.categoryId.name}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              justifyContent={"center"}
            >
              <Button variant="contained" sx={{backgroundColor:"#E8194F"}} onClick={() => navigate(`/questionForm/${id}`)}>
                EDIT
              </Button>
              <Button variant="outlined" color="error" onClick={() => navigate("/auditPage")}>
                BACK
              </Button>
            </Box>
          </Stack>

          {question?.questions?.map((que, index) => (
            <Card sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    backgroundColor: "#fde2e2",
                    borderRadius: 1,
                    p: 1,
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {`Question ${index + 1} :`}
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{ fontWeight: 500, ml: 1 }}
                    >
                      {que?.question}
                    </Typography>
                  </Typography>
                </Box>

                <Grid container spacing={1} direction={"column"}>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Preferred Answer:</strong>{" "}
                      <Typography
                        component="span"
                        color="green"
                        sx={{ fontWeight: 500 }}
                      >
                        {que.prefAns}
                      </Typography>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Type:</strong> {que.type}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    {Array.isArray(que.options) &&
                    que.options.filter((opt) => opt.trim() !== "").length >
                      0 && (
                      <Stack
                        direction={isMobile ? "column" : "row"}
                        spacing={2}
                        flexWrap="wrap"
                      >
                        <Typography>
                          <strong>Options:</strong>
                        </Typography>
                        {que.options
                          .filter((opt) => opt.trim() !== "")
                          .map((opt, idx) => (
                            <Typography key={idx}>
                              {idx + 1}. {opt}
                            </Typography>
                          ))}
                      </Stack>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default ViewQuestion;
