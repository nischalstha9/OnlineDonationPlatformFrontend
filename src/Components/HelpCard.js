import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function HelpCard({ title, description }) {
  return (
    <Card sx={{ maxWidth: 345, background: "white" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://www.researchgate.net/publication/343504533/figure/fig4/AS:962816924188675@1606564851537/The-forest-green-lizard-Calotes-calotes-is-large-among-the-lizard-species-measuring_Q640.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
