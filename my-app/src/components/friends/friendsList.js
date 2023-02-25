import React, { Component } from "react";
import dayjs from "dayjs";

// react router
import { Link } from "react-router-dom";

// components
import Unfriend from "./buttons/unfriend";
import AddFriend from "./buttons/addFriend";

// mui
import { Typography, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Avatar, styled } from "@mui/material";

// redux
import { connect } from "react-redux";
import { getStaticUserData } from "../../redux/actions/staticUserActions";

const PREFIX = 'friendsList';

const classes = {
  buttons: `${PREFIX}-buttons`
};

const StyledList = styled(List)({
  width: "100%",
  paddingLeft: 5,
  paddingRight: 5,
  boxSizing: "border-box",
  [`& .${classes.buttons}`]: {
    display: "block",
    marginTop: 8,
  },
});

class FriendsList extends Component {
  ToShowButton = (friendUserHandle) => {
    let {
      user,
      user: { credentials, authenticated },
    } = this.props;
    if (friendUserHandle && authenticated && user && credentials) {
      let friends = user.credentials.friends;
      if (!friends) {
        friends = [];
      }
      if (!friends.some((friend) => friend.userHandle === friendUserHandle)) {
        return <AddFriend friendUserHandle={friendUserHandle} deleteBtnStyle={{ ml: 1 }} />;
      } else {
        return <Unfriend friendUserHandle={friendUserHandle} btnStyle={{ width: '86px' }} />;
      }
    } else {
      return null;
    }
  };

  render() {
    let {
      user: { credentials },
      friendsToList,
      buttonONBottom,
    } = this.props;
    return (
      <StyledList>
        {friendsToList.map((friend, index) => {
          return (
            <React.Fragment key={friend.userHandle}>
              {friend.userHandle !== credentials.userHandle && (
                <>
                  <ListItem
                    component={Link}
                    alignItems="flex-start"
                    to={`/user/${friend.userHandle}`}
                    divider={index < friendsToList.length - 1 ? true : false}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={friend.userHandle}
                        src={friend.profilePictureUrl}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography color="primary">
                          {`@${friend.userHandle}`}
                        </Typography>
                      }
                      secondary={
                        <>
                          {dayjs(friend.createdAt).format("MMM DD, YYYY")}
                          {buttonONBottom && (
                            <span className={classes.buttons}>
                              {this.ToShowButton(friend.userHandle)}
                            </span>
                          )}
                        </>
                      }
                    />
                    {!buttonONBottom && (
                      <ListItemSecondaryAction>
                        {this.ToShowButton(friend.userHandle)}
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                </>
              )}
            </React.Fragment>
          );
        })}
      </StyledList>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  getStaticUserData,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(FriendsList);
