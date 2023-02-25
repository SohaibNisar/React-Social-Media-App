import React, { Component } from 'react';

// mui
import { Button, Typography } from '@mui/material';

// redux
import { connect } from 'react-redux';
import { addFriend, cancelRequest, confirmRequest } from '../../../redux/actions/userActions';


class AddFriend extends Component {

    handleAddFriend = (e, userHandle) => {
        e.preventDefault();
        this.props.addFriend(userHandle);
    }

    handleCancelRequest = (e, userHandle) => {
        this.props.cancelRequest(userHandle);
        e.preventDefault();
    }

    handleConfirmRequest = (e, userHandle) => {
        e.preventDefault();
        this.props.confirmRequest(userHandle);
    }

    render() {
        let { user: { credentials: { friendRequestsSent, friendRequestsRecieved }, authenticated }, friendUserHandle, } = this.props;

        if (!friendRequestsSent) {
            friendRequestsSent = [];
        }
        if (!friendRequestsRecieved) {
            friendRequestsRecieved = [];
        }

        let requested = friendRequestsSent && (friendRequestsSent.some(request => request.userHandle === friendUserHandle));
        let recieved = friendRequestsRecieved && (friendRequestsRecieved.some(request => request.userHandle === friendUserHandle));

        return (
            // <Root>
            <>
                {authenticated && (recieved ?
                    <>
                        <Button sx={{ minWidth: 69, ...this.props.confirmBtnStyle }} variant="contained" size='small' color='primary' component='span' onClick={(e) => this.handleConfirmRequest(e, friendUserHandle)} >
                            <Typography variant='caption' >Confirm</Typography >
                        </Button >
                        <Button sx={{ minWidth: 79, ...this.props.deleteBtnStyle }} variant="outlined" color='secondary' size='small' component='span' onClick={(e) => this.handleCancelRequest(e, friendUserHandle)} >
                            <Typography variant='caption'>Delete</Typography>
                        </Button>
                    </>
                    : !requested ?
                        < Button sx={{ minWidth: 98, ...this.props.addBtnStyle }} variant="contained" size='small' color='primary' component='span' onClick={(e) => this.handleAddFriend(e, friendUserHandle)} >
                            <Typography variant='caption' >Add Friend</Typography >
                        </Button > :
                        <Button sx={{
                            minWidth: 136,
                            color: 'black',
                            bgcolor: 'tertiary.main',
                            '&:hover': {
                                color: 'black',
                                bgcolor: 'tertiary.main',
                            },
                            ...this.props.addBtnStyle
                        }} variant="contained" size='small' component='span' onClick={(e) => this.handleCancelRequest(e, friendUserHandle)} >
                            <Typography variant='caption'>Cancel Request</Typography>
                        </Button>
                )
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    addFriend,
    cancelRequest,
    confirmRequest,
}

export default connect(mapStateToProps, mapActionsToProps)(AddFriend);

