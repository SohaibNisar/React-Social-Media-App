import React, { Component } from "react";

// components
import Post from "../components/post/postCard";
import NoFriends from "../components/friends/buttons/noFriends";
import FriendsList from "../components/friends/friendsList";

// mui
import {
  Grid,
  Typography,
  Paper,
  List,
  ListSubheader,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// redux
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

const PREFIX = "home";

const classes = {
  sideFriendList: `${PREFIX}-sideFriendList`,
  title: `${PREFIX}-title`,
  marginBottomLarge: `${PREFIX}-marginBottomLarge`,
};

const Root = styled(Grid)(({ theme }) => ({
  justifyContent: "space-evenly",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
  [`& .${classes.sideFriendList}`]: {
    margin: "0 3px 3px 3px",
    padding: "0 3px 3px 3px",
    position: "sticky",
    overflow: "auto",
    maxHeight: "calc(100vh - 99px)",
    top: "70px",
    display: "none",
    "@media(min-width: 900px)": {
      display: "block",
    },

    "& ul": { padding: 0, margin: 0 },

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
  [`& .${classes.title}`]: {
    padding: "10px",
    color: "#fff",
    backgroundColor: "#009688",
    fontWeight: "bold",
    borderRadius: 0,
  },
  [`& .${classes.marginBottomLarge}`]: {
    marginBottom: 20,
  },
}));

const Posts = (props) => {
  let {
    data: { posts, errors },
  } = props;

  if (!posts || errors) {
    if (errors.errorCode === "auth/id-token-expired") {
      window.location.reload();
    } else {
      console.log(errors.message);
      return <div>{errors.message}</div>;
    }
  } else if (posts && posts.length > 0) {
    return (
      <>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
        <div className={classes.marginBottomLarge}>
          <NoFriends
            mainText="No More Posts Available"
            subText="Add more friends to see more posts"
          />
        </div>
      </>
    );
  } else {
    return (
      <div className={classes.marginBottomLarge}>
        <NoFriends
          mainText="No Posts Available"
          subText="Add friends to see posts"
        />
      </div>
    );
  }
};

const Sidebar = (props) => {
  let { user } = props;
  return (
    <Paper>
      <List subheader={<li />}>
        {user.credentials.friendRequestsRecieved &&
          user.credentials.friendRequestsRecieved.length > 0 && (
            <li>
              <ul>
                <ListSubheader sx={{ p: 0 }}>
                  <Typography
                    align="center"
                    className={classes.title}
                    component={Paper}
                  >
                    Friend Requests
                  </Typography>
                </ListSubheader>
                <FriendsList
                  friendsToList={user.credentials.friendRequestsRecieved}
                  buttonONBottom={this.state.mobile}
                />
              </ul>
            </li>
          )}
        {user.credentials.friends && user.credentials.friends.length > 0 ? (
          <li>
            <ul>
              <ListSubheader sx={{ p: 0 }}>
                <Typography
                  align="center"
                  sx={{ mt: "10px" }}
                  className={classes.title}
                  component={Paper}
                >
                  Friends List
                </Typography>
              </ListSubheader>
              <FriendsList
                friendsToList={user.credentials.friends}
                buttonONBottom={false}
              />
              <Divider />
              <NoFriends mainText="No More Friends" size="small" noShadow />
            </ul>
          </li>
        ) : (
          <NoFriends mainText="No Friends" noShadow />
        )}
      </List>
    </Paper>
  );
};

class Home extends Component {
  state = {
    mobile: false,
  };

  componentDidMount() {
    this.props.getPosts();
    let mediaQueryList = window.matchMedia("(max-width:1220px)");
    if (mediaQueryList.matches) {
      this.setState({ mobile: true });
    }
    mediaQueryList.addEventListener("change", (e) => {
      if (e.matches) {
        this.setState({ mobile: true });
      } else {
        this.setState({ mobile: false });
      }
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    let {
      data: { loadingData },
      user: { loadingUser },
      user,
    } = this.props;
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(i);
    }
    return (
      <Root container>
        <Grid item sm={9} md={7} xs={11}>
          {!loadingData ? <Posts {...this.props} /> : "...Loading"}
        </Grid>
        <Grid item md={4}>
          <div className={classes.sideFriendList}>
            {!loadingUser
              ? user.credentials && <Sidebar {...this.props} />
              : "...Loading"}
          </div>
        </Grid>
      </Root>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

const mapActionsToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
