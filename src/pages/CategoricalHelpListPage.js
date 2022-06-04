import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import HelpCard from "../Components/HelpCard";
import HelpFilter from "../Components/HelpFilter";
import AxiosInstance from "../AxiosInstance";
import CustomPagination from "../Components/CustomPagination";
import {
  HELP_FILTER_HAS_SEARCH,
  HELP_PAGINATION_ITEM_LIMIT,
} from "../redux/constants";
import { Helmet } from "react-helmet";
import MostLikedHelps from "../Components/MostLikedHelps";
import TopCategories from "../Components/TopCategories";
import { useParams } from "react-router-dom";

const HelpsList = () => {
  const [donations, setDonations] = React.useState([]);
  const [category_name, setCategoryName] = React.useState("Category");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [dataCount, setDataCount] = React.useState(0);
  const limit = HELP_PAGINATION_ITEM_LIMIT;
  const [loading, setLoading] = useState(true);
  const { category_id } = useParams();

  const handleChangePage = (event, newPage) => {
    window.scroll(0, 500);
    setPage(newPage);
  };

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(
      `/donation/donation/?search=${searchQuery}&category=${
        category_id || ""
      }&limit=${limit}&offset=${page * limit}&ordering=-updated_at`
    )
      .then((resp) => {
        setDonations(resp.data.results);
        setCategoryName(
          resp.data.results.length > 0
            ? resp.data.results[0].category_name
            : "Category"
        );
        setDataCount(resp.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery, limit, page]);

  return (
    <>
      <Helmet>
        <title>Helps Available for {category_name} | Sharing is Caring</title>
      </Helmet>
      <Container
        sx={{ marginBottom: "25vh", marginTop: "4vh", minWidth: "90vw" }}
      >
        <Typography variant="h3" sx={{ marginBottom: "2vh" }} align="center">
          {searchQuery !== ""
            ? `Search Results for "${searchQuery}"`
            : `Helps Available for ${category_name}`}
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            sx={{
              marginY: 1,
              display: "flex",
              alignContent: "flex-start",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginY: 1 }}>
              <HelpFilter
                filtersList={[HELP_FILTER_HAS_SEARCH]}
                setSearchQuery={(query) => {
                  setPage(0);
                  setSearchQuery(query);
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            spacing={2}
            sx={{ marginY: 1, height: "min-content" }}
          >
            {loading ? (
              <Container
                component="main"
                sx={{ paddingY: 0, paddingX: 2, marginY: 10 }}
              >
                <LinearProgress />
              </Container>
            ) : (
              <>
                <Grid
                  container
                  item
                  xs={12}
                  lg={12}
                  spacing={2}
                  sx={{ marginY: 1, height: "min-content" }}
                >
                  {donations.length > 0 ? (
                    donations.map((donation) => {
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
                  ) : (
                    <Grid item xs={12} xl={12}>
                      <Typography variant="subtitle1" align="center">
                        -- No items for selected category ☹️--
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
              </>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            sx={{
              marginY: 2,
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              paddingY: 0,
            }}
          >
            <Box>
              <MostLikedHelps />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HelpsList;
