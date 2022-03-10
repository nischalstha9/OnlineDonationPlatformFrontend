import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActions } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { parseDate } from "./Utils";
import DonationLikeShareAction from "./DonationLikeShareAction";

export default function HelpCard({ help }) {
  return (
    <Card
      sx={{
        background: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex end",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="https://www.researchgate.net/publication/343504533/figure/fig4/AS:962816924188675@1606564851537/The-forest-green-lizard-Calotes-calotes-is-large-among-the-lizard-species-measuring_Q640.jpg"
        alt="green iguana"
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe"></Avatar>
        }
        title={help.title}
        subheader={parseDate(help.created_at)}
      />
      <CardActions disableSpacing>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DonationLikeShareAction help={help} />
          <Grid>
            <Button
              size="small"
              color="primary"
              component={Link}
              to={`/help-detail/${help.slug}`}
            >
              Read More
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
