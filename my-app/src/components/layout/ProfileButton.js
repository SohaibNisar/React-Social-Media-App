import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../images/no-profile-picture.png";

// component
import MyButton from "../../util/myButton";

// mui
import { Avatar, MenuItem, Menu } from "@mui/material";

// mui icons
import { ExitToApp, AccountCircle } from "@mui/icons-material";

// redux
import { SET_UNAUTHENTICATED } from "../../redux/types";
import store from "../../redux/store";
import { connect } from "react-redux";

const ProfileButton = (props) => {
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  let { credentials } = props;

  const handleOpen = (e) => {
    if (props.credentials) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/");
    store.dispatch({ type: SET_UNAUTHENTICATED });
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate(`/user/${credentials.userHandle}`);
  };

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip={props.credentials && "View Profile"}
        content={
          <Avatar
            alt={props.credentials ? credentials.userHandle : "no image"}
            src={props.credentials ? credentials.profilePictureUrl : img}
          />
        }
        color="inherit"
        size="small"
      />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>
          <AccountCircle />
          <span> Profile</span>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToApp />
          <span> Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps)(ProfileButton);
