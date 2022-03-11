import React from "react";
import * as Yup from "yup";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import CategoriesDropdown from "../Components/CategoriesDropdown";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import AxiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import RenderTemplate from "../Components/RenderTemplate";

const CreateHelp = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const DonationFormValidationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "Too Short!")
      .max(70, "Too Long!")
      .required("Title for your help is needed!"),
    description: Yup.string()
      .min(20, "Too Short!")
      .required("Short description is required."),
    location: Yup.string()
      .min(6, "Too Short!")
      .required("Please give pickup location for your help."),
    contact: Yup.string()
      .trim()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Please enter a valid contact number."
      )
      .required("Please give a contact number to make your help reachable."),
  });
  const createDonationForm = useFormik({
    initialValues: {
      title: "",
      category: 0,
      description: "",
      location: "",
      contact: "",
      active: false,
    },
    onSubmit: (values, { isSubmitting }) => {
      AxiosInstance.post("donation/donation/", values)
        .then((resp) => {
          toast.success("New Help Created Successfully!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          createDonationForm.resetForm();
          history.push("/helps");
        })
        .catch((err) => {
          for (const error_field in err.response.data) {
            toast.warning(err.response.data[error_field][0], {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        });
      isSubmitting(false);
    },
    validationSchema: DonationFormValidationSchema,
  });
  return (
    <Container sx={{ minWidth: "90vw" }}>
      <Helmet>
        <title>Sharing is Caring | Create New Help</title>
      </Helmet>
      <Paper sx={{ minHeight: "110vh", padding: "8px" }} fullWidth>
        <Typography variant="h4" component="h4">
          Enter Donation Details
        </Typography>
        <Divider />
        <Grid container item spacing={2}>
          <Grid
            item
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ marginTop: "10px", padding: "15px" }}
          >
            <RenderTemplate />
            <Typography variant="h6">
              {parse(createDonationForm.values.title)}
            </Typography>
            <Typography variant="p">
              Category: {createDonationForm.values.category}
            </Typography>
            <Typography variant="p">
              Description: {parse(createDonationForm.values.description)}
              location: {parse(createDonationForm.values.location)}
              contact: {parse(createDonationForm.values.contact)}
              active:{" "}
              {parse(
                createDonationForm.values.active === true ? "true" : "false"
              )}
            </Typography>
          </Grid>
          <Grid
            item
            container
            sm={12}
            md={6}
            xl={6}
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "10px",
              marginTop: "10px",
              overflow: "hidden",
            }}
          >
            <Grid item>
              <TextField
                autoFocus
                name="title"
                required
                fullWidth
                id="title"
                label="Help Title"
                onChange={createDonationForm.handleChange}
                value={createDonationForm.values.title}
                error={
                  createDonationForm.touched.title &&
                  Boolean(createDonationForm.errors.title)
                }
                helperText={
                  createDonationForm.touched.title &&
                  createDonationForm.errors.title
                }
              />
            </Grid>
            <Grid item>
              <CategoriesDropdown
                setCategoryFilter={(category) => {
                  createDonationForm.setFieldValue("category", category);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                autoComplete=""
                name="location"
                required
                fullWidth
                id="location"
                label="Location"
                onChange={createDonationForm.handleChange}
                value={createDonationForm.values.location}
                error={
                  createDonationForm.touched.location &&
                  Boolean(createDonationForm.errors.location)
                }
                helperText={
                  createDonationForm.touched.location &&
                  createDonationForm.errors.location
                }
              />
            </Grid>
            <Grid item>
              <FormControl>
                <CKEditor
                  editor={ClassicEditor}
                  data={createDonationForm.description}
                  name="description"
                  onChange={(event, editor) => {
                    createDonationForm.setFieldValue(
                      "description",
                      editor.getData()
                    );
                  }}
                />
                <FormHelperText id="my-helper-text" sx={{ color: "#d32f2f" }}>
                  {createDonationForm.touched.description &&
                    createDonationForm.errors.description}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                autoComplete=""
                name="contact"
                required
                fullWidth
                id="contact"
                label="Contact"
                onChange={createDonationForm.handleChange}
                value={createDonationForm.values.contact}
                error={
                  createDonationForm.touched.contact &&
                  Boolean(createDonationForm.errors.contact)
                }
                helperText={
                  createDonationForm.touched.contact &&
                  createDonationForm.errors.contact
                }
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={createDonationForm.active}
                    onChange={createDonationForm.handleChange}
                    name="active"
                  />
                }
                label="Active"
                name="active"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ color: "white" }}
                onClick={createDonationForm.handleSubmit}
                disabled={createDonationForm.isValidating}
              >
                Create Help
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateHelp;
