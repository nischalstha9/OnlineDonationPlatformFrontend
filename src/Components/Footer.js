import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { List, ListItem, ListItemText } from "@mui/material";

function Copyright() {
  return (
    <>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://shrestha-nischal.com.np/">
          Nischal Shrestha
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg" display="flex">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "justify", textJustify: "inter-word" }}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">Address</Typography>
            <List dense={true} sx={{ marginLeft: "0px" }}>
              <ListItem>
                <ListItemText
                  primary="Kathmandu, 00977, NP"
                  secondary="Reach Us"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="info@sharingiscaring.com.np"
                  secondary="Email Us"
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="+977 01 567XXX" secondary="Call Us" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">Follow Us</Typography>
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
          </Grid>
        </Grid>
        <Copyright />
      </Container>
    </Box>
  );
}
