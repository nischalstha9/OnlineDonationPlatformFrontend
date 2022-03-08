import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HelpCard from "../Components/HelpCard";
import HelpFilter from "../Components/HelpFilter";
import AxiosInstance from "../AxiosInstance";
import CustomTablePagination from "../Components/CustomTablePagination";
import CustomPagination from "../Components/CustomPagination";

const HelpsList = () => {
  const [donations, setDonations] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataCount, setDataCount] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    AxiosInstance.get(
      `/donation/donation/?search=${searchQuery}&category=${
        categoryFilter || ""
      }&limit=1&offset=0`
    )
      .then((resp) => {
        setDonations(resp.data.results);
        setDataCount(resp.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery, categoryFilter]);

  return (
    <Container component="main" sx={{ marginBottom: "25vh", marginTop: "4vh" }}>
      <Typography component="h1" variant="h4" sx={{ marginBottom: "2vh" }}>
        Helps Available
        <hr />
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
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
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
        <Grid container item xs={12} sm={12} md={8} spacing={2}>
          {donations.map((donation) => {
            return (
              <Grid item xs={12} sm={12} md={4}>
                <HelpCard
                  title={donation.title}
                  description={donation.description}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HelpsList;
