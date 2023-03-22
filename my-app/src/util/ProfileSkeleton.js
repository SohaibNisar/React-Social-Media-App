import { Component } from "react";
import noimg from "../images/no-profile-picture.png";

// components
import PostCardSkeleton from "./postCardSkeleton";

// mui
import {
  Grid,
  Avatar,
  Paper,
  Typography,
  Skeleton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// mui icon
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const PREFIX = "profileSkeleton";

const classes = {
  paper: `${PREFIX}-paper`,
  sideSection: `${PREFIX}-sideSection`,
  profileAvtar1: `${PREFIX}-profileAvtar1`,
  profileAvtar2: `${PREFIX}-profileAvtar2`,
  about: `${PREFIX}-about`,
  skeleton1: `${PREFIX}-skeleton1`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    padding: 20,
    paddingTop: 60,
    borderRadius: "4px 4px 0 0 ",
    "@media(min-width: 600px)": {
      borderRadius: "0 4px 4px ",
      paddingTop: 20,
    },
  },

  [`& .${classes.sideSection}`]: {
    "@media(min-width: 599px)": {
      padding: "3px",
      position: "sticky",
      top: "70px",
      overflow: "auto",
      maxHeight: "calc(100vh - 90px)",
      "&:hover": {
        "&::-webkit-scrollbar": {
          display: "unset",
        },
        "&::-webkit-scrollbar-thumb": {
          boxShadow: "inset 0 0 0 10px rgb(140, 142, 142)",
        },
      },
      "&::-webkit-scrollbar": {
        width: "14px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "content-box",
        border: "4px solid transparent",
        borderRadius: "7px",
        boxShadow: "transparent 0 0 0 10px",
      },
    },
  },

  [`& .${classes.profileAvtar1}`]: {
    width: "100%",
    height: "200px",
    margin: "0 auto",
    display: "none",
    "@media(min-width: 600px)": {
      display: "block",
    },
  },

  [`& .${classes.profileAvtar2}`]: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "0 auto -50px auto",
    "@media(min-width: 600px)": {
      display: "none",
    },
  },

  [`& .${classes.about}`]: {
    display: "none",
    "@media(min-width: 600px)": {
      display: "block",
    },
  },

  [`& .${classes.skeleton1}`]: {
    "@media(min-width: 600px)": {
      mt: -12,
    },
  },
}));

class ProfileSkeleton extends Component {
  render() {
    return (
      <StyledGrid container justifyContent="space-evenly">
        <Grid item sm={4} md={3} xs={11} className={classes.sideSection}>
          <Avatar
            variant="square"
            alt="no image"
            src={noimg}
            className={classes.profileAvtar1}
          />
          <Avatar
            alt="no image"
            src={noimg}
            className={classes.profileAvtar2}
          />
          <Paper className={classes.paper} variant="elevation">
            <Typography
              align="center"
              variant="h6"
              sx={{ fontWeight: "bolder" }}
            >
              <Skeleton animation="wave" width={"60%"} sx={{ mx: "auto" }} />
            </Typography>
            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              gutterBottom
            >
              <Skeleton animation="wave" width={"75%"} sx={{ mx: "auto" }} />
            </Typography>

            <div className={classes.about}>
              <Typography
                variant="body1"
                color="primary"
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                Details
              </Typography>

              <Divider />

              <Typography
                variant="body2"
                sx={{ mt: "10px", display: "flex", alignItems: "center" }}
              >
                <HomeIcon color="primary" />
                <Typography sx={{ ml: "5px" }} component="span">
                  Location
                </Typography>
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: "10px", display: "flex", alignItems: "center" }}
              >
                <MailOutlineIcon color="primary" />
                <Typography sx={{ ml: "5px" }} component="span">
                  abc@email.com
                </Typography>
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: "10px", display: "flex", alignItems: "center" }}
              >
                <LinkIcon color="primary" />
                <Typography sx={{ ml: "5px" }} component="span">
                  https://website.com
                </Typography>
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: "10px", display: "flex", alignItems: "center" }}
              >
                <QueryBuilderIcon color="primary" />
                <Typography sx={{ ml: "5px" }} component="span">
                  Joined Date
                </Typography>
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: "10px", display: "flex", alignItems: "center" }}
              >
                <RssFeedIcon color="primary" />
                <Typography sx={{ ml: "5px" }} component="span">
                  Freind With
                </Typography>
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item sm={7} md={8} xs={11}>
          <Skeleton animation="wave" width={"100%"} height={65} />
          <PostCardSkeleton />
        </Grid>
      </StyledGrid>
    );
  }
}

export default ProfileSkeleton;
