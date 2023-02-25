import React, { Component } from "react";

// react router
import { Link, useNavigate } from "react-router-dom";

// mui
import { Typography, TextField, Grid, Button, CircularProgress, styled } from "@mui/material";

// redux
import { loginUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";

const PREFIX = 'loginForm';

const classes = {
  form: `${PREFIX}-form`,
  button: `${PREFIX}-button`,
  errorText: `${PREFIX}-errorText`,
  circularProgress: `${PREFIX}-circularProgress`
};

const StyledLoginForm = styled('div')({
  textAlign: "center",
  marginTop: 25,
  [`& .${classes.form}`]: {
    marginTop: 5,
    marginBottom: 20,
  },
  [`& .${classes.button}`]: {
    marginTop: 15,
    marginBottom: 15,
    position: "relative",
  },
  [`& .${classes.errorText}`]: {
    marginTop: 15,
  },
  [`& .${classes.circularProgress}`]: {
    position: "absolute",
  },
});

class LoginForm extends Component {
  state = {
    email: null,
    password: null,
    loading: false,
    errors: {},
  };

  componentWillReceiveProps(nextprops) {
    if (nextprops.UI.errors) {
      this.setState({ errors: nextprops.UI.errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.navigate);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let { UI: { loading } } = this.props;
    return (
      <StyledLoginForm>
        <Typography variant="h5">Login</Typography>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sm={8} md={7} xs={11}>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant="standard"
                id="email"
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                fullWidth
                onChange={this.handleChange}
                margin="dense"
                helperText={this.state.errors.email}
                error={this.state.errors.email ? true : false} />
              <TextField
                id="password"
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                fullWidth
                onChange={this.handleChange}
                margin="normal"
                helperText={this.state.errors.password}
                error={this.state.errors.password ? true : false}
                variant='standard'
              />
              {this.state.errors.general ? (
                <Typography color="error" className={classes.errorText}>
                  Wrong credentials please try again
                </Typography>
              ) : (
                this.state.errors.other && (
                  <Typography color="error" className={classes.errorText}>
                    {this.state.errors.other.errMessage}
                  </Typography>
                )
              )}
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={loading}
                className={classes.button}
              >
                Login
                {loading && (
                  <CircularProgress className={classes.circularProgress} size={25} />
                )}
              </Button>
              <Typography variant="body2" component={"span"} display="block">
                Don't have an account ? sign up{" "}
                <Link to="/auth/signup">
                  <Typography color="primary" display="inline">
                    here
                  </Typography>
                </Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </StyledLoginForm>
    );
  }
}

const WithNavigate = (props) => {
  let navigate = useNavigate();
  return <LoginForm {...props} navigate={navigate} />;
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(WithNavigate);
