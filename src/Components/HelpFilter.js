import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CategoriesDropdown from "../Components/CategoriesDropdown";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";

export default function HelpFilter({ setSearchQuery, setCategoryFilter }) {
  const [sQuery, setSQuery] = React.useState("");
  function filter_by_search(query) {
    setSQuery(query);
    setSearchQuery(query);
  }
  return (
    <Grid
      sx={{
        background: "white",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
      item
      xs={12}
      sm={12}
      spacing={2}
      container
    >
      <Typography component="h1" variant="h5">
        Filter Your Search
        <hr />
      </Typography>
      <Grid item>
        <TextField
          id="search"
          label="Search Help Title"
          variant="outlined"
          fullWidth
          value={sQuery}
          onChange={(e) => {
            filter_by_search(e.target.value);
          }}
        />
      </Grid>
      <Grid item>
        <CategoriesDropdown setCategoryFilter={setCategoryFilter} />
      </Grid>
    </Grid>
  );
}
