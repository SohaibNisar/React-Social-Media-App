import React, { Component } from "react";
import dayjs from "dayjs";

// mui
import { Divider, Typography, styled } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const PREFIX = "aboutDetails";

const classes = {
  profileItem: `${PREFIX}-profileItem`,
  bolder: `${PREFIX}-bolder`,
  bold: `${PREFIX}-bold`,
};

const Root = styled("div")({
  [`& .${classes.profileItem}`]: {
    width: "100%",
    overflow: "hidden",
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    "& a": {
      color: "#009688",
      marginLeft: 5,
    },
    "& span": {
      marginLeft: 5,
    },
  },
  [`& .${classes.bolder}`]: {
    fontWeight: "bolder !important",
  },
  [`& .${classes.bold}`]: {
    fontWeight: "bold !important",
  },
});

class About extends Component {
  render() {
    let { credentials } = this.props;
    return (
      <Root>
        <Typography
          variant="body1"
          color="primary"
          className={classes.bold}
          sx={{ mt: 2 }}
        >
          Details
        </Typography>
        <Divider />
        {credentials.location && (
          <Typography variant="body2" className={classes.profileItem}>
            <HomeIcon color="primary" />
            <span>
              {"Lives In "}
              {credentials.location}
            </span>
          </Typography>
        )}
        <Typography variant="body2" className={classes.profileItem}>
          <MailOutlineIcon color="primary" />
          <span>{credentials.email}</span>
        </Typography>

        {credentials.website && (
          <Typography variant="body2" className={classes.profileItem}>
            <LinkIcon color="primary" />
            <a
              href={credentials.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {credentials.website}
            </a>
          </Typography>
        )}

        <Typography variant="body2" className={classes.profileItem}>
          <QueryBuilderIcon color="primary" />
          <span>
            {"Joined "}
            {dayjs(credentials.createdAt).format("MMMM YYYY")}
          </span>
        </Typography>

        {credentials.friends && (
          <Typography variant="body2" className={classes.profileItem}>
            <RssFeedIcon color="primary" />
            <span>
              {"Freind With "}
              {credentials.friends.length}
              {" People"}
            </span>
          </Typography>
        )}
      </Root>
    );
  }
}

export default About;
