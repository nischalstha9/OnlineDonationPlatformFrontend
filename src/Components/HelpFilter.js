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
  function filter_by_search(e) {
    if (e.keyCode == 13) {
      setSearchQuery(e.target.value);
    }
  }
  return (
    <Grid
      sx={{
        background: "white",
        padding: "1vw",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        marginTop: "10px",
      }}
      item
      container
      xs={12}
      sm={12}
      spacing={2}
    >
      <Typography component="h1" variant="h5">
        Filter Your Search
        <hr />
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Grid item>
          <TextField
            id="search"
            label="Search Help Title"
            variant="outlined"
            fullWidth
            value={sQuery}
            onChange={(e) => setSQuery(e.target.value)}
            onKeyUp={(e) => {
              filter_by_search(e);
            }}
          />
        </Grid>
        <Grid item>
          <CategoriesDropdown setCategoryFilter={setCategoryFilter} />
        </Grid>
      </Grid>
    </Grid>
  );
}
