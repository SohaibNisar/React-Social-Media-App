import React, { Component } from 'react'
import dayjs from "dayjs";

// react router dom
import { Link } from 'react-router-dom';

// mui
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

class FriendCard extends Component {
    render() {
        let { friend, button } = this.props;
        return (
            <Card sx={{ width: 150, mb: '20px', mr: '20px' }} component={Link} to={`/user/${friend.userHandle}`}>
                <CardMedia
                    sx={{ height: 100 }}
                    image={friend.profilePictureUrl}
                    title="profile picture"
                />
                <CardContent sx={{ p: '8px' }}>
                    <Typography gutterBottom component="div" color="primary" sx={{ m: 0 }}>
                        @{friend.userHandle}
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.6)' }}>
                        {dayjs(friend.createdAt).format("MMM DD, YYYY")}
                    </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, display: 'flex', flexDirection: 'column' }} onClick={e => e.preventDefault()}>
                    {button}
                </CardActions>
            </Card>
        )
    }
}

export default FriendCard;