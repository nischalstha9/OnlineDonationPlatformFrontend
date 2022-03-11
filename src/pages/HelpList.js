import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import HelpCard from "../Components/HelpCard";
import HelpFilter from "../Components/HelpFilter";
import AxiosInstance from "../AxiosInstance";
import CustomPagination from "../Components/CustomPagination";

const HelpsList = () => {
  const [donations, setDonations] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [dataCount, setDataCount] = React.useState(0);
  const limit = 8;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    AxiosInstance.get(
      `/donation/donation/?search=${searchQuery}&category=${
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
  }, [searchQuery, categoryFilter, page, limit]);

  return (
    <Container
      sx={{ marginBottom: "25vh", marginTop: "4vh", minWidth: "90vw" }}
    >
      <Typography variant="h3" sx={{ marginBottom: "2vh" }} align="right">
        Helps Available
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} sx={{ marginY: 1 }}>
          <HelpFilter
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
          {donations.map((donation) => {
            return (
              <Grid item xs={12} sm={4} md={3} key={donation.id}>
                <HelpCard help={donation} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HelpsList;
