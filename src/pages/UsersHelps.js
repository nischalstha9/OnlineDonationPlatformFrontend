import React, { useEffect, useState } from "react";
import HelpCard from "../Components/HelpCard";
import HelpFilter from "../Components/HelpFilter";
import AxiosInstance from "../AxiosInstance";
import CustomPagination from "../Components/CustomPagination";
import {
  Grid,
  Typography,
  LinearProgress,
  Container,
  Divider,
  Paper,
  Box,
} from "@mui/material";
// import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  HELP_FILTER_HAS_SEARCH,
  HELP_FILTER_HAS_CATEGORY,
  HELP_PAGINATION_ITEM_LIMIT,
} from "../redux/constants";
import { useParams } from "react-router-dom";
import ProfileCard from "../Components/ProfileCard";
import CallIcon from "@mui/icons-material/Call";

const HelpsList = () => {
  // const history = useHistory();
  const [donations, setDonations] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [dataCount, setDataCount] = React.useState(0);
  const limit = HELP_PAGINATION_ITEM_LIMIT;
  const [loading, setLoading] = useState(true);
  const { user_id } = useParams();
  const [user, setUser] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(`auth/doner/info/${user_id}`)
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(
      `/donation/user-donations/${user_id}/?search=${searchQuery}&category=${
        categoryFilter || ""
      }&limit=${limit}&offset=${page * limit}&ordering=-created_at`
    )
      .then((resp) => {
        setDonations(resp.data.results);
        setDataCount(resp.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery, categoryFilter, page, limit]);

  return (
    <>
      <Helmet>
        <title>
          Helps by {user !== null ? user.first_name + " " + user.last_name : ""}{" "}
          | Sharing is Caring
        </title>
      </Helmet>
      <Container
        sx={{ marginBottom: "25vh", marginTop: "4vh", minWidth: "90vw" }}
      >
        <Typography variant="h3" sx={{ marginBottom: "2vh" }} align="right">
          {searchQuery !== ""
            ? `Search Results for "${searchQuery}"`
            : `Helps by User: ${
                user !== null ? user?.first_name + " " + user?.last_name : ""
              }`}
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} sx={{ marginTop: 1 }}>
            <HelpFilter
              filtersList={[HELP_FILTER_HAS_CATEGORY, HELP_FILTER_HAS_SEARCH]}
              setSearchQuery={(query) => {
                setSearchQuery(query);
              }}
              setCategoryFilter={(query) => {
                setCategoryFilter(query);
              }}
            />
          </Grid>
          <Grid container item xs={12} sm={12} md={6} spacing={2}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              spacing={2}
              sx={{ marginY: 1 }}
            >
              {loading ? (
                <Container component="main" sx={{ padding: "0", marginY: 10 }}>
                  <LinearProgress />
                </Container>
              ) : donations.length > 0 ? (
                donations.map((donation) => {
                  return (
                    <Grid item xs={12} sm={4} md={4} lg={4} key={donation.id}>
                      <HelpCard help={donation} />
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12} xl={12}>
                  <Typography variant="subtitle1" align="center">
                    -- No items for selected filter ☹️--
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginY: 1 }}>
              <CustomPagination
                dataCount={dataCount}
                rowsPerPage={limit}
                page={page}
                handleChangePage={handleChangePage}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={3} sx={{ marginTop: 1 }}>
            {user && (
              <Paper sx={{ padding: 2, borderRadius: 3 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="h6" align="right">
                    Doner Information
                    <Divider />
                    <ProfileCard user={user} />
                    <Divider />
                  </Typography>
                  <Box sx={{ marginY: 3 }}>
                    <Box sx={{ display: "flex" }}>
                      <CallIcon sx={{ marginX: 1 }} />
                      <Typography
                        variant="subtitle"
                        align="left"
                        justify="center"
                      >
                        {`Contact: ${user.phone}`}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HelpsList;
