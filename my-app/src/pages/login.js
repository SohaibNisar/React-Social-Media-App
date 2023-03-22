import React from 'react';
import SwipeableViews from 'react-swipeable-views';

// react router dom
import { useParams, useNavigate } from 'react-router-dom';

// components
import LoginForm from '../components/auth/loginForm';
import SignUpForm from '../components/auth/signUpForm';

// mui
import { AppBar, Tabs, Tab, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// redux
import { connect } from 'react-redux';

const PREFIX = 'loginSignupTabs';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto'
  }
}));

let FullWidthTabs = () => {

  const { page } = useParams();
  let navigate = useNavigate();

  const tabNameToIndex = React.useMemo(() => {
    return {
      "login": 0,
      "signup": 1
    };
  }, []);

  const indexToTabName = React.useMemo(() => {
    return {
      0: "login",
      1: "signup"
    };
  }, []);


  const [value, setValue] = React.useState();

  React.useEffect(() => {
    if (tabNameToIndex[page] === undefined) {
      navigate('/404');
    }
    setValue(tabNameToIndex[page]);
  }, [page, navigate, indexToTabName, tabNameToIndex]);

  const handleChange = (event, newValue) => {
    navigate(`/auth/${indexToTabName[newValue]}`);
    setValue(newValue);
  };

  return (
    <Root>
      {value !== undefined &&
        <Grid container justifyContent="space-around">
          <Grid item sm={7} md={6} xs={11} >
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Login" />
                  <Tab label="Signup" />
                </Tabs>
              </AppBar>
              <SwipeableViews axis="x" index={value}>
                <>
                  {value === 0 && <LoginForm />}
                </>
                <>
                  {value === 1 && <SignUpForm />}
                </>
              </SwipeableViews>
            </div>
          </Grid>
        </Grid>}
    </Root>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(FullWidthTabs);