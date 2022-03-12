import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import HelpCard from "../Components/HelpCard";
import HelpFilter from "../Components/HelpFilter";
import AxiosInstance from "../AxiosInstance";
import CustomPagination from "../Components/CustomPagination";
import {
  HELP_FILTER_HAS_SEARCH,
  HELP_FILTER_HAS_CATEGORY,
  HELP_PAGINATION_ITEM_LIMIT,
} from "../redux/constants";
import { Helmet } from "react-helmet";

const HelpsList = () => {
  const [donations, setDonations] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [dataCount, setDataCount] = React.useState(0);
  const limit = HELP_PAGINATION_ITEM_LIMIT;
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(
      `/donation/liked-donations/?search=${searchQuery}&category=${
        categoryFilter || ""
      }&limit=${limit}&offset=${page * limit}&ordering=-created_at`
    )
      .then((resp) => {
        setDonations(resp.data.results);
        setDataCount(resp.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, [searchQuery, categoryFilter, limit, page]);

  return (
    <>
      <Helmet>
        <title>Helps Liked</title>
      </Helmet>
      <Container
        sx={{ marginBottom: "25vh", marginTop: "4vh", minWidth: "90vw" }}
      >
        <Typography variant="h3" sx={{ marginBottom: "2vh" }} align="right">
          {searchQuery !== ""
            ? `Search Results for "${searchQuery}"`
            : "Helps Liked"}
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} sx={{ marginY: 1 }}>
            <HelpFilter
              filtersList={[HELP_FILTER_HAS_SEARCH, HELP_FILTER_HAS_CATEGORY]}
              setSearchQuery={(query) => {
                setPage(0);
                setSearchQuery(query);
              }}
              setCategoryFilter={(query) => {
                setPage(0);
                setCategoryFilter(query);
              }}
            />
            <Box display="flex" justifyContent="flex-end">
              <CustomPagination
                dataCount={dataCount}
                rowsPerPage={limit}
                page={page}
                handleChangePage={handleChangePage}
              />
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={9}
            spacing={2}
            sx={{ marginY: 1 }}
          >
            {loading ? (
              <Container component="main" sx={{ padding: "0", marginY: 10 }}>
                <LinearProgress />
              </Container>
            ) : (
              donations.map((donation) => {
                return (
                  <Grid item xs={12} sm={4} md={4} lg={3} key={donation.id}>
                    <HelpCard help={donation} />
                  </Grid>
                );
              })
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HelpsList;
