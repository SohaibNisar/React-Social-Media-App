// mui
import {
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
  Avatar,
} from "@mui/material";

// other
import img from "../images/no-profile-picture.png";

const FriendsList = (props) => {
  let arr = Array(props.size).fill(0);
  return (
    <List>
      {arr.map((X, i) => {
        return (
          <ListItem divider={i < arr.length - 1 ? true : false} key={i}>
            <ListItemAvatar>
              <Avatar alt="no image" src={img} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography color="primary">
                  <Skeleton animation="wave" width="30%" />
                </Typography>
              }
              secondary={<Skeleton animation="wave" width="50%" />}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const HomeFriendlistSkeleton = () => {
  return (
    <Paper>
      <List subheader={<li />}>
        <li>
          <ul>
            <ListSubheader sx={{ p: 0 }}>
              <Typography
                align="center"
                sx={{
                  p: "10px",
                  color: "#fff",
                  backgroundColor: "#009688",
                  fontWeight: "bold",
                  borderRadius: 0,
                }}
                component={Paper}
              >
                Friend Requests
              </Typography>
            </ListSubheader>
            <FriendsList size={3} />
          </ul>
        </li>
        <li>
          <ul>
            <ListSubheader sx={{ p: 0 }}>
              <Typography
                align="center"
                sx={{
                  mt: "10px",
                  padding: "10px",
                  color: "#fff",
                  backgroundColor: "#009688",
                  fontWeight: "bold",
                  borderRadius: 0,
                }}
                component={Paper}
              >
                Friends List
              </Typography>
            </ListSubheader>
            <FriendsList size={4} />
          </ul>
        </li>
      </List>
    </Paper>
  );
};

export {HomeFriendlistSkeleton,FriendsList};
