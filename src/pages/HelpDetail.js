import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  Paper,
  Divider,
  LinearProgress,
  Button,
  Box,
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
import HelpCard from "../Components/HelpCard";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const HelpDetail = () => {
  const user = useSelector((state) => state.user);
  const [help, setHelp] = useState({});
  const [relatedHelps, setRelatedHelps] = useState([]);
  const [relatedHelpsLoading, setRelatedHelpsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const { help_slug } = useParams();

  function fetchHelpDetails() {
    AxiosInstance.get(`donation/donation/${help_slug}`)
      .then((resp) => {
        setHelp(resp.data);
        setIsOwner(true);
        AxiosInstance.get(
          `donation/get-related-helps/?help_id=${resp.data.id}`
        ).then((resp) => {
          setRelatedHelps(resp.data);
          setRelatedHelpsLoading(false);
        });
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
    <Container
      component="main"
      sx={{ padding: "0", marginY: 10 }}
      id="loading-container"
    >
      <LinearProgress />
    </Container>
  ) : isOwner ? (
    <>
      <Helmet>
        <title>{help.title} | Sharing is Caring</title>
      </Helmet>
      {/* <CardMedia
        component="img"
        sx={{ width: "100%", margin: 0, p: 0, height: "500px" }}
        image="https://images.unsplash.com/photo-1640622658353-c6cecbe91488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      /> */}
      <Box sx={{ padding: "10px", minHeight: "100vh" }}>
        <Container
          component="main"
          sx={{ padding: "0" }}
          id="main-grid-container"
        >
          <Typography
            id="help-title"
            variant="h3"
            sx={{ marginBottom: "2vh" }}
            align="right"
          >
            {help.title}
            <Divider />
          </Typography>
          {help.doner.id === user.id && (
            <Typography variant="subtitle2" align="right">
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
            </Typography>
          )}
          <Typography align="left">
            {help.likes.length > 0 && help.likes.length > 1
              ? `${help.likes.length} Likes`
              : `${help.likes.length} Like`}
            <DonationLikeShareAction help={help} />
          </Typography>
          <Grid container spacing={3} id="content-meta-box-container">
            <Grid item container sm={12} md={8} id="content-container">
              <Grid item container xs={12} sm={12} md={12} lg={12}>
                <Grid item xs={12} sm={12} md={12} lg={12} id="main-content">
                  <Paper sx={{ padding: 2, borderRadius: 3, height: "100%" }}>
                    <Typography variant="h6" align="left">
                      Description:
                    </Typography>
                    <Divider />
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{
                        textAlign: "justify",
                        textJustify: "inter-word",
                        maxHeight: "80vh",
                        overflowY: "scroll",
                      }}
                    >
                      {help.description && parse(help.description)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} id="related-helps">
                  <Typography
                    variant="h6"
                    align="left"
                    sx={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      marginY: 5,
                    }}
                  >
                    Related Helps
                    <Divider />
                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      spacing={2}
                      sx={{ marginY: 1, height: "min-content" }}
                    >
                      {relatedHelpsLoading ? (
                        <Container
                          component="main"
                          sx={{ paddingY: 0, paddingX: 2, marginY: 10 }}
                        >
                          <LinearProgress />
                        </Container>
                      ) : (
                        relatedHelps.map((donation) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={6}
                              lg={4}
                              xl={4}
                              key={donation.id}
                            >
                              <HelpCard help={donation} />
                            </Grid>
                          );
                        })
                      )}
                    </Grid>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} md={4} grid="meta-container">
              <Paper sx={{ padding: 2, borderRadius: 3 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="h6" align="right">
                    Helper Information
                    <Divider />
                    <ProfileCard user={help.doner} />
                    <Button
                      component={Link}
                      to={`/user-helps/${help.doner.id}`}
                    >
                      More from {help.doner.first_name}
                    </Button>
                    <Divider />
                  </Typography>
                  <Box sx={{ marginY: 3 }}>
                    <Box sx={{ display: "flex" }}>
                      <CategoryIcon sx={{ marginX: 1 }} />
                      <Typography
                        variant="subtitle"
                        align="left"
                        justify="center"
                      >
                        {`Category: ${help.category_name}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <CalendarMonthOutlinedIcon sx={{ marginX: 1 }} />
                      <Typography
                        variant="subtitle"
                        align="left"
                        justify="center"
                      >
                        {`Created: ${parseDate(help.created_at)}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <CalendarMonthIcon sx={{ marginX: 1 }} />
                      <Typography
                        variant="subtitle"
                        align="left"
                        justify="center"
                      >
                        {`Last Updated: ${parseDate(help.updated_at)}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <CallIcon sx={{ marginX: 1 }} />
                      <Typography
                        variant="subtitle"
                        align="left"
                        justify="center"
                      >
                        {`Referred Contact: ${help.contact}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <AddIcCallIcon sx={{ marginX: 1 }} />
                      <Typography
                        variant="subtitle"
                        align="left"
                        justify="center"
                      >
                        {`Doner's Contact: ${help.doner.phone}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <LocationOnIcon sx={{ marginX: 1 }} />
                      <Typography
                        variant="subtitle"
                        align="left"
                        justify="center"
                      >
                        {`Location: ${help.location}`}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Paper>
              <Divider />
              <Grid item xs={12} md={12} lg={12} sx={{ marginY: 3 }}>
                <MostLikedHelps />
              </Grid>
              <Grid item xs={12} md={12} xl={12} sx={{ marginTop: 3 }}>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ textAlign: "justify", textJustify: "inter-word" }}
                >
                  Categories
                </Typography>
                <Divider />
                <TopCategories />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  ) : (
    <NoPermission />
  );
};

export default HelpDetail;
