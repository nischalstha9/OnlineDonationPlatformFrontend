import React, { useEffect, useState } from "react";
import HelpCard from "../Components/HelpCard";
import HelpFilter from "../Components/HelpFilter";
import AxiosInstance from "../AxiosInstance";
import CustomPagination from "../Components/CustomPagination";
import { useSelector } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  LinearProgress,
  Container,
  Divider,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HELP_PAGINATION_ITEM_LIMIT } from "../redux/constants";

const HelpsList = () => {
  const history = useHistory();
  const [donations, setDonations] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("");
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
      `/donation/mydonations/?search=${searchQuery}&category=${
        categoryFilter || ""
      }&limit=${limit}&offset=${
        page * limit
      }&ordering=-created_at&active=${activeFilter}`
    )
      .then((resp) => {
        setDonations(resp.data.results);
        setDataCount(resp.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery, categoryFilter, page, limit, activeFilter]);

  return (
    <>
      <Helmet>
        <title>My Helps</title>
      </Helmet>
      <Container
        sx={{ marginBottom: "25vh", marginTop: "4vh", minWidth: "90vw" }}
      >
        <Typography variant="h3" sx={{ marginBottom: "2vh" }} align="right">
          {searchQuery !== ""
            ? `Search Results for "${searchQuery}"`
            : "My Helps"}
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} sx={{ marginY: 1 }}>
            <HelpFilter
              setActiveFilter={(query) => {
                setActiveFilter(query);
              }}
              setSearchQuery={(query) => {
                setSearchQuery(query);
              }}
              setCategoryFilter={(query) => {
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
