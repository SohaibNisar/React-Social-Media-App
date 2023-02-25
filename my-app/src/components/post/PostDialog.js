import React, { Component } from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

// components
import MyButton from '../../util/myButton';
import DeletePostButton from './buttons/deletePost';
import Comments from './Comments';
import CommentForm from './CommentForm';

// mui
import { styled, Card, CardHeader, CardMedia, CardContent, Avatar, Typography, Link as MuiLink, Button, Tooltip, Divider, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

// mui icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// redux
import { connect } from "react-redux";
import { likePost, unlikePost, getSinglePost } from '../../redux/actions/dataActions';
import { CLEAR_ERRORS, STOP_LOADING_UI, UNSET_POST } from "../../redux/types";
import store from '../../redux/store';


const PREFIX = 'post-dialog';

const classes = {
    media: `${PREFIX}-media`,
    likeAndCommentCounts: `${PREFIX}-likeAndCommentCounts`,
    cardActions: `${PREFIX}-cardActions`
};

const Root = styled(Card)({
    [`& .${classes.media}`]: {
        maxWidth: '100%',
        borderBottom: '1 solid #000',
    },
    [`& .${classes.likeAndCommentCounts}`]: {
        padding: '10px 16px',
        lineHeight: "36px",
        '& span:last-child': {
            float: 'right',
        }
    },
});


class PostDialog extends Component {
    state = {
        oldPath: "",
        newPath: ""
    }
    componentDidMount() {
        // let { singlePost: { id, userHandle } } = this.props;
        // let newPath = `/user/${userHandle}/post/${id}`;
        // console.log(newPath)
    }

    componentWillUnmount() {
        store.dispatch({ type: CLEAR_ERRORS });
        store.dispatch({ type: STOP_LOADING_UI });
        store.dispatch({ type: UNSET_POST });
    }

    render() {
        dayjs.extend(relativeTime);
        let { singlePost, user: { likes, credentials, authenticated }, UI } = this.props;

        let liked, deleteButton;

        if (!UI.loading) {
            liked = likes && (likes.some(like => like.postId === singlePost.id));
            deleteButton = singlePost && credentials ? singlePost.userHandle === credentials.userHandle : false;
        }

        return (
            <>
                {UI.loading ?
                    <Box textAlign='center'>
                        <CircularProgress size={200} sx={{ m: 3 }} thickness={2} />
                    </Box> :
                    <Root variant='outlined' sx={{ border: 'none' }}>
                        <CardHeader
                            avatar={
                                <Avatar alt={singlePost.userHandle} src={singlePost.profilePicture} />
                            }
                            action={
                                authenticated && deleteButton ? <DeletePostButton postId={singlePost.id} /> : null
                            }
                            title={
                                <MuiLink component={Link}
                                    to={`/user/${singlePost.userHandle}`}
                                    sx={{ fontWeight: 'bold', color: '#009688' }
                                    }
                                >
                                    {singlePost.userHandle}
                                </MuiLink>
                            }
                            subheader={dayjs(singlePost.createdAt).fromNow()}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {singlePost.body}
                            </Typography>
                        </CardContent>
                        {singlePost.postMedia && <CardMedia
                            component="img"
                            className={classes.media}
                            image={singlePost.postMedia}
                            title={singlePost.id}
                        />}
                        <div className={classes.likeAndCommentCounts}>
                            {!authenticated ?
                                <MuiLink component={Link} to='/' >
                                    <MyButton
                                        tip='Like'
                                        content={<FavoriteBorderIcon />}
                                        color='primary'
                                        sx={{ minWidth: 40, mr: .5, mt: "-3px" }}
                                    />
                                </MuiLink>
                                : liked ?
                                    <Tooltip title='Like' arrow>
                                        <Button
                                            color="primary"
                                            onClick={() => this.props.unlikePost(singlePost.id)}
                                            sx={{ minWidth: 40, mr: .5, mt: "-3px" }}
                                        >
                                            <FavoriteIcon />
                                        </Button>
                                    </Tooltip> :
                                    <Tooltip title='Like' arrow>
                                        <Button
                                            color="primary"
                                            onClick={() => this.props.likePost(singlePost.id)}
                                            sx={{ minWidth: 40, mr: .5, mt: "-3px" }}
                                        >
                                            <FavoriteBorderIcon />
                                        </Button>
                                    </Tooltip>
                            }
                            <span>{singlePost.likesCount} Likes</span>
                            <span>{singlePost.commentsCount} Comments</span>
                        </div>
                        <Divider variant='middle' />
                        {authenticated &&
                            <>
                                <CommentForm postId={singlePost.id} />
                                <Divider variant='middle' />
                            </>
                        }
                        <Comments comments={singlePost.comments} />
                    </Root>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    singlePost: state.data.singlePost,
    UI: state.UI,
    user: state.user,
})

const mapActionsToProps = {
    likePost,
    unlikePost,
    getSinglePost,
}

export default connect(mapStateToProps, mapActionsToProps)(PostDialog);