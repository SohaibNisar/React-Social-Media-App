import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useParams } from 'react-router-dom';

// components
import FriendsList from '../../friends/friendsList';
import Post from '../../post/postCard';
import About from './aboutDetails';
import AddFriend from '../../friends/buttons/addFriend';
import Unfriend from '../../friends/buttons/unfriend';
import EditProfile from './editProfileButton';

// mui
import { AppBar, Tabs, Tab, Paper, Typography, Toolbar, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

// redux
import { connect } from 'react-redux';

const PREFIX = 'postsAndFriends';

const classes = {
    root: `${PREFIX}-root`,
    about: `${PREFIX}-about`,
    aboutPaper: `${PREFIX}-aboutPaper`,
    button: `${PREFIX}-button`
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        backgroundColor: theme.palette.background.paper,
        margin: '0 auto 8px auto',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        '@media (max-width: 600px)': {
            borderRadius: '0 0 4px 4px',
        },
        '& .MuiTabScrollButton-root': {
            display: 'none',
            width: 25,
            '@media (max-width: 785px)': {
                display: 'inline-flex',
            },
            '@media (max-width: 600px)': {
                display: 'none',
            },
            '@media (max-width: 430px)': {
                display: 'inline-flex',
            },
        },
    },

    [`& .${classes.about}`]: {
        '@media (min-width: 600px)': {
            display: 'none',
        },
    },

    [`& .${classes.aboutPaper}`]: {
        padding: 20,
    },

    [`& .${classes.button}`]: {
        marginLeft: 'auto',
        marginRight: 10,
        marginBottom: 2,
        '@media (max-width: 600px)': {
            marginRight: 4,
        },
    }
}));

let FullWidthTabs = (props) => {

    let params = useParams();
    const [value, setValue] = React.useState(0);
    let { user, user: { authenticated }, staticUser: { credentials: { friends, staticUserHandle }, posts, credentials } } = props;

    const listButtonBreak = useMediaQuery('(max-width:670px) and (min-width:600px),(max-width:430px)');
    const tabsDoubleButtonMediaQuery = useMediaQuery('(max-width:716px) and (min-width:600px),(max-width:494px)');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const TABS = () => {
        return (
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant={!authenticated ? "fullWidth" : "scrollable"}
                centered={!authenticated ? true : false}
                scrollButtons
                allowScrollButtonsMobile>
                <Tab label="Posts" />
                <Tab label="About" className={classes.about} />
                <Tab label="Friends" />
            </Tabs>
        );
    }

    if (friends) {
        if (authenticated) {
            friends = friends.filter(friend => friend.userHandle !== user.credentials.userHandle && friend.userHandle !== staticUserHandle)
        } else {
            friends = friends.filter(friend => friend.userHandle !== staticUserHandle)
        }
    } else {
        friends = [];
    }

    return (
        <Root>
            <AppBar position="static" color="default" className={classes.root}>
                {authenticated && user.credentials && user.credentials.userHandle ?
                    <Toolbar className={classes.toolBar} variant='dense' disableGutters>
                        {TABS()}
                        <div className={classes.button}>
                            {user.credentials.userHandle === credentials.userHandle ?
                                <EditProfile /> :
                                !user.credentials.friends.some(friend => friend.userHandle === credentials.userHandle) ?
                                    <AddFriend verticle={true} friendUserHandle={credentials.userHandle}
                                        confirmBtnStyle={
                                            tabsDoubleButtonMediaQuery ? {
                                                width: '100%',
                                                my: '5px',
                                            } : {
                                                mr: '5px'
                                            }}
                                        deleteBtnStyle={
                                            tabsDoubleButtonMediaQuery && {
                                                width: '100%',
                                                mb: '3px',
                                            }
                                        }
                                    /> :
                                    <Unfriend friendUserHandle={credentials.userHandle} />
                            }
                        </div>
                    </Toolbar> : TABS()
                }
            </AppBar>
            <SwipeableViews axis='x' index={value} onChangeIndex={handleChangeIndex} >
                <>
                    {value === 0 &&
                        posts.length > 0 ?
                        posts.map(post => <Post post={post} key={post.id} openPostDialog={params.postId && params.postId === post.id ? true : false} />) :
                        <Paper>
                            <Typography align='center' sx={{ fontWeight: 'bold', padding: '20px' }}>
                                No Posts Available
                            </Typography>
                        </Paper>
                    }
                </>
                <>
                    {value === 1 &&
                        <Paper className={classes.aboutPaper}>
                            <About credentials={credentials} />
                        </Paper>
                    }
                </>
                <>
                    {value === 2 &&
                        <Paper>
                            {
                                friends.length > 0 ?
                                    <FriendsList friendsToList={friends} buttonONBottom={listButtonBreak} /> :
                                    <Typography align='center' sx={{ fontWeight: 'bold', padding: '20px' }}>
                                        No Friends
                                    </Typography>
                            }
                        </Paper>
                    }
                </>
            </SwipeableViews>
        </Root>
    );
}

const mapStateToProps = (state) => ({
    staticUser: state.staticUser,
    user: state.user,
})

export default connect(mapStateToProps)(FullWidthTabs);