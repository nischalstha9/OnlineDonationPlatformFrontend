import { React } from "react";
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
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useQuery } from "../Components/Utils";

export default function Login() {
  const history = useHistory();
  const query = useQuery();

  const passwordSetSchema = Yup.object().shape({
    new_password1: Yup.string()
      .min(8, "Your password length must be atlease 8 and alphanumeric")
      .required("Password cannot be empty!"),
    new_password2: Yup.string()
      .required("Enter Your Password Again!")
      .test("matchPassword", "Both passwords must match!", (value) => {
        return value === passwordSetForm.values.new_password1;
      }),
  });

  const passwordSetForm = useFormik({
    initialValues: {
      token: query.get("token"),
      identifier: query.get("identifier"),
      type: 1,
      new_password1: "",
      new_password2: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      AxiosInstance.post("/auth/user/password/reset/", values)
        .then((resp) => {
          toast.success(
            "Your password has been reset successfully. You can login now.",
            {
              position: toast.POSITION.BOTTOM_CENTER,
            }
          );
          history.push("/login");
        })
        .catch((err) => {
          toast.error(Object.values(err.response.data)[0][0], {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        });
      setSubmitting(false);
      passwordSetForm.resetForm();
    },
    validationSchema: passwordSetSchema,
  });
  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: "15vh" }}>
      <Helmet>
        <title>Set New Password | Sharing is Caring</title>
      </Helmet>
      <Paper
        sx={{
          padding: "1vh 2vw",
          border: "5px solid",
          borderColor: "primary.main",
        }}
      >
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
            Reset Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_password1"
                  label="Password"
                  type="password"
                  id="new_password1"
                  onChange={passwordSetForm.handleChange}
                  value={passwordSetForm.values.new_password1}
                  error={
                    passwordSetForm.touched.new_password1 &&
                    Boolean(passwordSetForm.errors.new_password1)
                  }
                  helperText={
                    passwordSetForm.touched.new_password1 &&
                    passwordSetForm.errors.new_password1
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_password2"
                  label="Confirm Password"
                  type="password"
                  id="new_password2"
                  onChange={passwordSetForm.handleChange}
                  value={passwordSetForm.values.new_password2}
                  error={
                    passwordSetForm.touched.new_password2 &&
                    Boolean(passwordSetForm.errors.new_password2)
                  }
                  helperText={
                    passwordSetForm.touched.new_password2 &&
                    passwordSetForm.errors.new_password2
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2, color: "white" }}
              onClick={passwordSetForm.handleSubmit}
              disabled={passwordSetForm.isSubmitting}
            >
              Save new password
            </Button>
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
