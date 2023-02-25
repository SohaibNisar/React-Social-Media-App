import React, { Component } from 'react'
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';

// MUI
import { Avatar, Typography, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export default class Comments extends Component {
    render() {
        let { comments } = this.props;
        return (
            <List >
                {comments.map((comment, index) => {
                    return (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="profile image" src={comment.profilePictureUrl} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography
                                            component={Link}
                                            to={`/user/${comment.userHandle}`}
                                            sx={{ fontWeight: 'bold', color: '#009688' }}
                                        >
                                            {comment.userHandle}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            {dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
                                            <Typography
                                                sx={{ display: 'block', mt: 1 }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {comment.body}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                            {index < comments.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment >
                    )
                })}
            </List>
        )
    }
}
