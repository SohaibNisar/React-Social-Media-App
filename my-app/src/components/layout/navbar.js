import React, { Component } from "react";

// react router dom
import { NavLink } from "react-router-dom";

// component
import MyButton from "../../util/myButton";
import UploadPost from "../post/buttons/uploadPost";
import Notifications from "./Notifications";
import ProfileButton from "./ProfileButton";

// mui
import { styled, AppBar, Toolbar, Button, Skeleton } from "@mui/material";

// mui icons
import { HomeRounded, PeopleAlt } from "@mui/icons-material";

//redux
import { connect } from "react-redux";

const PREFIX = "navbar";

const classes = {
  container: `${PREFIX}-container`,
  navLink: `${PREFIX}-navLink`,
  activeNavLink: `${PREFIX}-activeNavLink`,
};

const StyledNavbar = styled("div")({
  [`& .${classes.container}`]: {
    margin: "auto",
    padding: 5,
    display: "flex",
    justifyContent: "space-between",
  },
  [`& .${classes.navLink}`]: {
    color: "#fff",
    textDecoration: "none",
    borderRadius: 50,
    textAlign: "center",
  },
  [`& .${classes.activeNavLink}`]: {
    background: "teal",
  },
});

class Navbar extends Component {
  render() {
    return (
      <StyledNavbar>
        <AppBar>
          <Toolbar
            variant="dense"
            className={classes.container}
            sx={this.props.authenticated ? { width: 250 } : { width: 146 }}
          >
            {!this.props.authenticated ? (
              <>
                <NavLink
                  exact="true"
                  className={({ isActive }) =>
                    classes.navLink +
                    (isActive ? " " + classes.activeNavLink : "")
                  }
                  to="/auth/login"
                >
                  <Button variant="text" color="inherit">
                    Login
                  </Button>
                </NavLink>
                <NavLink
                  exact="true"
                  className={({ isActive }) =>
                    classes.navLink +
                    (isActive ? " " + classes.activeNavLink : "")
                  }
                  to="/auth/signup"
                >
                  <Button variant="text" color="inherit">
                    Signup
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  exact="true"
                  className={({ isActive }) =>
                    classes.navLink +
                    (isActive ? " " + classes.activeNavLink : "")
                  }
                  to="/"
                >
                  <MyButton
                    tip="Home"
                    content={<HomeRounded />}
                    color="inherit"
                  />
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    classes.navLink +
                    (isActive ? " " + classes.activeNavLink : "")
                  }
                  to="/friends"
                >
                  <MyButton
                    tip="Friends"
                    content={<PeopleAlt />}
                    color="inherit"
                  />
                </NavLink>
                {this.props.credentials ? (
                  <>
                    <UploadPost />
                    <Notifications />
                    <ProfileButton />
                  </>
                ) : (
                  <>
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                  </>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
      </StyledNavbar>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  credentials: state.user.credentials,
});

export default connect(mapStateToProps)(Navbar);
