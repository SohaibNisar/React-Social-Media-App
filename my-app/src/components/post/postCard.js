import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// react-router-dom
import { Link } from 'react-router-dom';

// components
import DeletePostButton from './buttons/deletePost';
import MyButton from '../../util/myButton';
import PostDialog from './PostDialog';

// mui
import { styled, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, CardActions, Link as MuiLink, Button, Tooltip, Divider, DialogContent, Dialog } from '@mui/material';

// mui icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';

// redux
import { connect } from "react-redux";
import { likePost, unlikePost, getSinglePost } from '../../redux/actions/dataActions';

const PREFIX = 'post';

const classes = {
    media: `${PREFIX}-media`,
    likeAndCommentCounts: `${PREFIX}-likeAndCommentCounts`,
    cardActions: `${PREFIX}-cardActions`
};

const Root = styled(Card)({
    marginBottom: 40,
    [`& .${classes.media}`]: {
        maxWidth: '100%',
        borderBottom: '1 solid #000',
    },
    [`& .${classes.likeAndCommentCounts}`]: {
        padding: '10px 16px',
        '& span:last-child': {
            float: 'right',
        }
    },
    [`& .${classes.cardActions}`]: {
        '& button': {
            width: '50%',
        }
    },
});

class Post extends Component {
    state = {
        open: false,
        oldPath: "",
        newPath: ""
    }

    componentDidMount() {
        if (this.props.openPostDialog) {
            console.log(this.props.post.id)
            this.handleDialogOpen();
        }
    }

    handleDialogOpen = () => {
        let { post: { id, userHandle } } = this.props;
        this.props.getSinglePost(id);
        let oldPath = window.location.pathname;
        let newPath = `/user/${userHandle}/post/${id}`;
        if (oldPath === newPath) {
            oldPath = `/user/${userHandle}`;
        }
        window.history.pushState(null, null, newPath);
        this.setState({ open: true, oldPath, newPath });
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false, newPath: "" });
    }

    render() {
        dayjs.extend(relativeTime);
        let { post, user: { likes, credentials, authenticated } } = this.props;
        let liked = likes && (likes.some(like => like.postId === post.id));
        let deleteButton = post && credentials ? post.userHandle === credentials.userHandle : false;
        return (
            <>
                <Root>
                    <CardHeader
                        avatar={
                            <Avatar alt={post.userHandle} src={post.profilePicture} />
                        }
                        action={
                            authenticated && deleteButton ? <DeletePostButton postId={post.id} /> : null
                        }
                        title={
                            <Link
                                to={`/user/${post.userHandle}`}
                                sx={{ fontWeight: 'bold', color: '#009688' }
                                }
                            >
                                {post.userHandle}
                            </Link>
                        }
                        subheader={dayjs(post.createdAt).fromNow()}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.body}
                        </Typography>
                    </CardContent>
                    {post.postMedia && <CardMedia
                        component="img"
                        className={classes.media}
                        image={post.postMedia}
                        title={post.id}
                    />}
                    <div className={classes.likeAndCommentCounts}>
                        <span>{post.likesCount} Likes</span>
                        <span>{post.commentsCount} Comments</span>
                    </div>
                    <Divider variant='middle' />
                    <CardActions disableSpacing className={classes.cardActions}>
                        {!authenticated ?
                            <MuiLink component={Link} to='/' >
                                <MyButton
                                    tip='Like'
                                    content={<FavoriteBorderIcon />}
                                    color='primary'
                                />
                            </MuiLink>
                            : liked ?
                                <Tooltip title='Like' arrow>
                                    <Button
                                        color="primary"
                                        startIcon={<FavoriteIcon />}
                                        onClick={() => this.props.unlikePost(post.id)}
                                    >
                                        <span>Liked</span>
                                    </Button>
                                </Tooltip> :
                                <Tooltip title='Like' arrow>
                                    <Button
                                        color="primary"
                                        startIcon={<FavoriteBorderIcon />}
                                        onClick={() => this.props.likePost(post.id)}
                                    >
                                        <span>Like</span>
                                    </Button>
                                </Tooltip>
                        }
                        <Tooltip title='Comment' arrow>
                            <Button
                                color="primary"
                                startIcon={<ChatIcon />}
                                onClick={() => this.handleDialogOpen(post.id)}
                            >
                                <span>Comment</span>
                            </Button>
                        </Tooltip>
                    </CardActions>
                </Root>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                >
                    <DialogContent >
                        <PostDialog />
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    likePost,
    unlikePost,
    getSinglePost,
}

export default connect(mapStateToProps, mapActionsToProps)(Post);
