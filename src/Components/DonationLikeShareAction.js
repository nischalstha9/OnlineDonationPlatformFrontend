import React from "react";
import { Grid, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import AxiosInstance from "../AxiosInstance";

const DonationLikeShareAction = ({ help }) => {
  const userId = useSelector((state) => state.user.id);
  const [liked, setLiked] = React.useState(help.likes.includes(userId));
  const changeLikeState = () => {
    AxiosInstance.post(`donation/donation/${help.id}/like/`).then((resp) =>
      setLiked(!liked)
    );
  };
  return (
    <Grid>
      <IconButton aria-label="like" onClick={changeLikeState}>
        <FavoriteIcon sx={{ color: liked ? "#456dfa" : "" }} />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
    </Grid>
  );
};

export default DonationLikeShareAction;
