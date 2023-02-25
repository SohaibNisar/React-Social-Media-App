import React, { Component } from 'react';

// commponents
import PostsAndFriends from './util/postsAndFriends';
import About from './util/aboutDetails';

// mui 
import { Grid, Avatar, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// redux
import { connect } from 'react-redux';

const PREFIX = 'profile';

const classes = {
  paper: `${PREFIX}-paper`,
  sideSection: `${PREFIX}-sideSection`,
  profileAvtar1: `${PREFIX}-profileAvtar1`,
  profileAvtar2: `${PREFIX}-profileAvtar2`,
  about: `${PREFIX}-about`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    padding: 20,
    boxShadow: '0px 0 1px -1px rgba(0,0,0,0.2), 0px 0 1px 0px rgba(0,0,0,0.14), 0px 0 3px 0px rgba(0,0,0,0.12)',
    paddingTop: 60,
    borderRadius: '4px 4px 0 0 ',
    '@media(min-width: 600px)': {
      borderRadius: '0 4px 4px ',
      paddingTop: 20,
    },
  },

  [`& .${classes.sideSection}`]: {
    '@media(min-width: 599px)': {
      position: 'sticky',
      top: '70px',
      overflow: 'auto',
      maxHeight: 'calc(100vh - 90px)',
      '&:hover': {
        '&::-webkit-scrollbar': {
          display: 'unset',
        },
        '&::-webkit-scrollbar-thumb': {
          boxShadow: 'inset 0 0 0 10px rgb(140, 142, 142)',
        },
      },
      '&::-webkit-scrollbar': {
        width: '14px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'content-box',
        border: '4px solid transparent',
        borderRadius: '7px',
        boxShadow: 'transparent 0 0 0 10px',
      },
    },
  },

  [`& .${classes.profileAvtar1}`]: {
    width: '100%',
    height: '200px',
    margin: '0 auto',
    display: 'none',
    '@media(min-width: 600px)': {
      display: 'block',
    },
  },

  [`& .${classes.profileAvtar2}`]: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: '0 auto -50px auto',
    '@media(min-width: 600px)': {
      display: 'none',
    },
  },

  [`& .${classes.about}`]: {
    display: 'none',
    '@media(min-width: 600px)': {
      display: 'block',
    },
  },
}));


class Profile extends Component {
  render() {
    let { credentials } = this.props;
    return (
      <StyledGrid container justifyContent='space-evenly'>
        <Grid item sm={4} md={3} xs={11} className={classes.sideSection}>
          <Avatar variant='square' alt={credentials.userHandle} src={credentials.profilePictureUrl} className={classes.profileAvtar1} />
          <Avatar alt={credentials.userHandle} src={credentials.profilePictureUrl} className={classes.profileAvtar2} />
          <Paper className={classes.paper}>
            <Typography align='center' variant='h6' className={classes.bolder}>
              {`@${credentials.userHandle}`}
            </Typography>
            {credentials.bio && <Typography align='center' variant='body2' color='textSecondary' gutterBottom>
              {credentials.bio}
            </Typography>}
            <div className={classes.about}>
              <About credentials={credentials} />
            </div>
          </Paper>
        </Grid>
        <Grid item sm={7} md={8} xs={11} >
          <PostsAndFriends />
        </Grid>
      </StyledGrid >
    )
  }
}

const mapStateToProps = (state) => ({
  credentials: state.staticUser.credentials,
})

export default connect(mapStateToProps)((Profile));
