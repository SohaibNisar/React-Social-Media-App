import React, { Component } from 'react';
import SwipeableViews from "react-swipeable-views";

// components
import FriendsList from "./friendsList";

// mui
import { Grid, AppBar, Toolbar, Menu, MenuItem, Paper, Typography } from '@mui/material';

// mui icons
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// redux
import { connect } from "react-redux";
import { getSuggestions } from "../../redux/actions/suggestionActions";

class MobileVersion extends Component {
    state = {
        index: 0,
        anchorEl: null,
        listButtonBreak: false,
    };

    componentDidMount() {
        let mediaQueryList = window.matchMedia("(max-width:415px)");
        if (mediaQueryList.matches) {
            this.setState({ listButtonBreak: true });
        }
        mediaQueryList.addEventListener("change", (e) => {
            if (e.matches) {
                this.setState({ listButtonBreak: true });
            } else {
                this.setState({ listButtonBreak: false });
            }
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    handleOpen = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    setIndex = (index) => {
        this.setState({
            index,
            anchorEl: null
        });

    }

    render() {
        let { suggestions, user } = this.props;
        let { index } = this.state;
        let categories = [
            "Suggestions",
            "Requests Sent",
            "Requests Received",
            "Friends",
        ];

        if (!suggestions) suggestions = [];
        if (!user.credentials.friendRequestsRecieved) user.credentials.friendRequestsRecieved = [];
        if (!user.credentials.friendRequestsSent) user.credentials.friendRequestsSent = [];
        if (!user.credentials.friends) user.credentials.friends = [];

        return (
            <Grid container justifyContent="space-around">
                <Grid item sm={9} xs={11}>
                    <AppBar position='static' color='inherit' sx={{ m: '0 auto 5px auto' }}>
                        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">
                                {categories[index]}
                            </Typography>
                            <IconButton onClick={this.handleOpen} size="large">
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                {categories.map((category, index) => {
                                    return (
                                        <MenuItem key={index} onClick={() => this.setIndex(index)}>
                                            {category}
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </Toolbar>
                    </AppBar>
                    <Paper>
                        <SwipeableViews index={index}>
                            <>
                                {index === 0 &&
                                    suggestions.length > 0 ? (
                                    <FriendsList friendsToList={suggestions} buttonONBottom={this.state.listButtonBreak} />
                                ) : (
                                    <Typography sx={{ fontWeight: 'bolder', py: '20px' }} align="center">
                                        No Suggestions
                                    </Typography>
                                )}
                            </>
                            <>
                                {index === 1 &&
                                    user.credentials.friendRequestsSent.length > 0 ? (
                                    <FriendsList friendsToList={user.credentials.friendRequestsSent} buttonONBottom={this.state.listButtonBreak} />
                                ) : (
                                    <Typography sx={{ fontWeight: 'bolder', py: '20px' }} align="center">
                                        No Requests Sent
                                    </Typography>
                                )}
                            </>
                            <>
                                {index === 2 &&
                                    user.credentials.friendRequestsRecieved.length > 0 ? (
                                    <FriendsList friendsToList={user.credentials.friendRequestsRecieved} buttonONBottom={this.state.listButtonBreak}
                                    />
                                ) : (
                                    <Typography sx={{ fontWeight: 'bolder', py: '20px' }} align="center">
                                        No Requests Recieved
                                    </Typography>
                                )}
                            </>
                            <>
                                {index === 3 &&
                                    user.credentials.friends.length > 0 ? (
                                    <FriendsList friendsToList={user.credentials.friends} buttonONBottom={this.state.listButtonBreak}
                                    />
                                ) : (
                                    <Typography sx={{ fontWeight: 'bolder', py: '20px' }} align="center">
                                        No Friends
                                    </Typography>
                                )}
                            </>
                        </SwipeableViews>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    suggestions: state.suggestions.suggestions,
});

const mapActionsToProps = {
    getSuggestions,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(MobileVersion);