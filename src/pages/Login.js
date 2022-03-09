import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { useFormik } from "formik";
import AxiosInstance from "../AxiosInstance";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { log_in, insert_user } from "../redux/action";
import CustomAlert from "../Components/CustomAlert";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address!").required("Required"),
    password: Yup.string().required("Password cannot be empty!"),
  });
  const [message, setMessage] = useState(null);

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      AxiosInstance.post("/auth/token/obtain/", values)
        .then((resp) => {
          localStorage.setItem("access_token", resp.data.access);
          localStorage.setItem("refresh_token", resp.data.refresh);
          dispatch(log_in());
          AxiosInstance("auth/user/").then((resp) => {
            let userData = resp.data;
            dispatch(insert_user(userData));
            localStorage.setItem("user", JSON.stringify(userData));
          });
          history.push("/helps");
        })
        .catch((err) => {
          setMessage({
            text: Object.values(err.response.data)[0][0],
            severity: "error",
          });
        });
      setSubmitting(false);
    },
    validationSchema: LoginSchema,
  });
  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: "15vh" }}>
      <Paper sx={{ padding: "1vh 2vw", border: "5px solid #39aa57" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.email}
                  required
                  error={
                    loginForm.touched.email && Boolean(loginForm.errors.email)
                  }
                  helperText={loginForm.touched.email && loginForm.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.password}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }}
              onClick={loginForm.handleSubmit}
              disabled={loginForm.isSubmitting || !loginForm.isValid}
            >
              Login
            </Button>
            {message !== null ? (
              <CustomAlert
                message={message.text}
                severity={message.severity}
                openState={true}
              />
            ) : (
              ""
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                Need an account? <Link to="/signup">Sign Up</Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/forget-password">Forget Password?</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
