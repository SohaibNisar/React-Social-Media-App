import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

// components
import FriendCard from "./friendCard";
import Unfriend from "./buttons/unfriend";
import AddFriend from './buttons/addFriend';

// mui
import { Tabs, Tab, Grid, AppBar, Typography, Paper } from '@mui/material'

// redux
import { connect } from "react-redux";

class DesktopVersion extends Component {
    state = { tabValue: 0 }

    handleChange = (e, tabValue) => {
        this.setState({ tabValue })
    }

    render() {
        let { user, suggestions } = this.props;
        if (!suggestions) suggestions = [];
        if (!user.credentials.friendRequestsRecieved) user.credentials.friendRequestsRecieved = [];
        if (!user.credentials.friendRequestsSent) user.credentials.friendRequestsSent = [];
        if (!user.credentials.friends) user.credentials.friends = [];
        return (
            <>
                <AppBar position="static" color="default" sx={{ bgcolor: 'white' }}>
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Suggestions" />
                        <Tab label="Friend Requests Sent" />
                        <Tab label="Friend Requests Recieved" />
                        <Tab label="Friends" />
                    </Tabs>
                </AppBar>
                <SwipeableViews axis="x" index={this.state.tabValue}>
                    <>
                        {this.state.tabValue === 0 &&
                            suggestions.length > 0 ? (
                            <Grid container justifyContent="center" paddingTop={2}>
                                {suggestions.map((friend, i) => (
                                    <FriendCard key={i} friend={friend} button={<AddFriend friendUserHandle={friend.userHandle} addBtnStyle={{ width: '100%' }} />} />
                                ))}
                            </Grid>) : (
                            <Paper sx={{ mt: '10px' }}>
                                <Typography sx={{ fontWeight: 'bolder', py: '20px', m: '5px' }} align="center">
                                    No Suggestions
                                </Typography>
                            </Paper>
                        )}
                    </>
                    <>
                        {this.state.tabValue === 1 &&
                            user.credentials.friendRequestsSent.length > 0 ? (
                            <Grid container justifyContent="center" paddingTop={2}>
                                {user.credentials.friendRequestsSent.map((friend, i) => (
                                    <FriendCard key={i} friend={friend} button={<AddFriend friendUserHandle={friend.userHandle} />} />
                                ))}
                            </Grid>) : (
                            <Paper sx={{ mt: '10px' }}>
                                <Typography sx={{ fontWeight: 'bolder', py: '20px', m: '5px' }} align="center">
                                    No Requests Sent
                                </Typography>
                            </Paper>
                        )}
                    </>
                    <>
                        {this.state.tabValue === 2 &&
                            user.credentials.friendRequestsRecieved.length > 0 ? (
                            <Grid container justifyContent="center" paddingTop={2}>
                                {user.credentials.friendRequestsRecieved.map((friend, i) => (
                                    <FriendCard key={i} friend={friend} button={<AddFriend friendUserHandle={friend.userHandle} confirmBtnStyle={{ width: '100%' }} deleteBtnStyle={{ width: '100%', ml: '0px !important', mt: 1 }} />} />
                                ))}
                            </Grid>) : (
                            <Paper sx={{ mt: '10px' }}>
                                <Typography sx={{ fontWeight: 'bolder', py: '20px', m: '5px' }} align="center">
                                    No Requests Recieved
                                </Typography>
                            </Paper>
                        )}
                    </>
                    <>
                        {this.state.tabValue === 3 &&
                            user.credentials.friends.length > 0 ? (
                            <Grid container justifyContent="center" paddingTop={2}>
                                {user.credentials.friends.map((friend, i) => (
                                    <FriendCard key={i} friend={friend} button={<Unfriend friendUserHandle={friend.userHandle} btnStyle={{ width: '100%' }} />} />
                                ))}
                            </Grid>) : (
                            <Paper sx={{ mt: '10px' }}>
                                <Typography sx={{ fontWeight: 'bolder', py: '20px', m: '5px' }} align="center">
                                    No Friends
                                </Typography>
                            </Paper>
                        )}
                    </>
                </SwipeableViews>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    suggestions: state.suggestions.suggestions,
});

const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(DesktopVersion);