import React, { useState, useEffect } from "react";
import HelpFilter from "../Components/HelpFilter";
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
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
import parse from "html-react-parser";
import { parseDate } from "../Components/Utils";
import DonationLikeShareAction from "../Components/DonationLikeShareAction";

const HelpDetail = () => {
  const categories = useSelector((state) => state.categories);
  const [help, setHelp] = useState({});
  const [loading, setLoading] = useState(true);
  const { help_slug } = useParams();
  useEffect(() => {
    AxiosInstance.get(`donation/donation/${help_slug}`).then((resp) => {
      setHelp(resp.data);
      setLoading(false);
    });
  }, [help_slug]);
  return loading ? (
    <Container component="main" sx={{ padding: "0", marginY: 10 }}>
      <LinearProgress />
    </Container>
  ) : (
    <>
      <CardMedia
        component="img"
        sx={{ width: "100%", margin: 0, p: 0, height: "500px" }}
        image="https://images.unsplash.com/photo-1640622658353-c6cecbe91488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      />
      <Paper sx={{ padding: "10px" }}>
        <Container component="main" sx={{ padding: "0" }}>
          <Typography
            component="h1"
            variant="inherit"
            sx={{ marginBottom: "2vh" }}
            align="right"
          >
            {help.title}
          </Typography>
          <Typography variant="subtitle1" align="right">
            -{" "}
            {help.doner.name.trim().length > 0
              ? help.doner.name
              : help.doner.email}
          </Typography>
          <Typography variant="subtitle2" align="right">
            - {parseDate(help.created_at)}
          </Typography>
          <DonationLikeShareAction help={help} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Typography
                variant="body2"
                align="left"
                sx={{ textAlign: "justify", textJustify: "inter-word" }}
              >
                {parse(help.description)}
              </Typography>
            </Grid>
            <Grid item sm={12} md={4} lg={4}>
              <Grid item xs={12} md={12}>
                <HelpFilter
                  setSearchQuery={(query) => {}}
                  setCategoryFilter={(query) => {}}
                />
              </Grid>
              <Divider />
              <Grid item xs={12} md={12} xl={12}>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ textAlign: "justify", textJustify: "inter-word" }}
                >
                  Categories
                </Typography>
                <List dense>
                  {categories.map((category) => {
                    return (
                      <ListItem
                        key={category.id}
                        button
                        to="/categories"
                        component={Link}
                      >
                        <ListItemText
                          primary={category.name}
                          secondary={`Donations available: ${category.num_donations}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              <Divider />
              <Grid>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ textAlign: "justify", textJustify: "inter-word" }}
                >
                  Trending Helps
                </Typography>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Ali Connors
                          </Typography>
                          {
                            " — I'll be in your neighborhood doing errands this…"
                          }
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Summer BBQ"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            to Scott, Alex, Jennifer
                          </Typography>
                          {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Sandra Adams
                          </Typography>
                          {
                            " — Do you have Paris recommendations? Have you ever…"
                          }
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default HelpDetail;
