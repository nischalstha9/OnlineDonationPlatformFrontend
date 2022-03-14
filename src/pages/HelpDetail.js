import React, { useState, useEffect } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Container,
  Paper,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
import parse from "html-react-parser";
import { parseDate } from "../Components/Utils";
import DonationLikeShareAction from "../Components/DonationLikeShareAction";
import { Helmet } from "react-helmet";
import ProfileCard from "../Components/ProfileCard";
import MostLikedHelps from "../Components/MostLikedHelps";
import TopCategories from "../Components/TopCategories";
import NoPermission from "../Components/NoPermission";

const HelpDetail = () => {
  const user = useSelector((state) => state.user);
  const [help, setHelp] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const { help_slug } = useParams();

  function fetchHelpDetails() {
    AxiosInstance.get(`donation/donation/${help_slug}`)
      .then((resp) => {
        setHelp(resp.data);
        setIsOwner(true);
      })
      .catch((err) => {
        setIsOwner(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    fetchHelpDetails();
  }, [help_slug]);

  return loading ? (
    <Container component="main" sx={{ padding: "0", marginY: 10 }}>
      <LinearProgress />
    </Container>
  ) : isOwner ? (
    <>
      <Helmet>
        <title>{help.title} | Sharing is Caring</title>
      </Helmet>
      <CardMedia
        component="img"
        sx={{ width: "100%", margin: 0, p: 0, height: "500px" }}
        image="https://images.unsplash.com/photo-1640622658353-c6cecbe91488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      />
      <Paper sx={{ padding: "10px", minHeight: "100vh" }}>
        <Container component="main" sx={{ padding: "0" }}>
          <Typography
            id="help-title"
            variant="h3"
            sx={{ marginBottom: "2vh" }}
            align="right"
          >
            {help.title}
          </Typography>
          {help.doner.id === user.id && (
            <Typography variant="subtitle2" align="right">
              <ButtonGroup aria-label="outlined primary button group">
                <Button
                  size="large"
                  component={Link}
                  to={`/edit-help/${help.slug}`}
                >
                  Edit
                </Button>
                <Button
                  size="large"
                  component={Link}
                  color="error"
                  to={`/delete-help/${help.slug}`}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Typography>
          )}
          <Typography align="left">
            <DonationLikeShareAction help={help} />
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Typography
                variant="body2"
                align="left"
                sx={{ textAlign: "justify", textJustify: "inter-word" }}
              >
                {help.description && parse(help.description)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" align="right">
                  Helper Information
                  <Divider />
                  <ProfileCard user={help.doner} />
                  <Divider />
                </Typography>
                <Typography variant="subtitle2" align="left">
                  {`- Created: ${parseDate(help.created_at)}`}
                </Typography>
                <Typography variant="subtitle2" align="left">
                  {`- Last Updated: ${parseDate(help.updated_at)}`}
                </Typography>
                <Typography variant="subtitle2" align="left">
                  {`- Contact: ${help.contact}`}
                </Typography>
              </Grid>
              <Divider />
              <Grid item xs={12} md={12} lg={12}>
                <MostLikedHelps />
              </Grid>
              <Divider />
              <Grid item xs={12} md={12} xl={12}>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ textAlign: "justify", textJustify: "inter-word" }}
                >
                  Top Categories
                </Typography>
                <TopCategories />
              </Grid>
              <Divider />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  ) : (
    <NoPermission />
  );
};

export default HelpDetail;
