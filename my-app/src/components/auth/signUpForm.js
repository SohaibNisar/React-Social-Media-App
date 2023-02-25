import React, { Component } from "react";


// raect router
import { Link, useNavigate } from "react-router-dom";

// mui
import { Typography, TextField, Grid, Button, CircularProgress, styled } from "@mui/material";

// redux
import { signupUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";

const PREFIX = 'signUpForm';

const classes = {
  form: `${PREFIX}-form`,
  button: `${PREFIX}-button`,
  errorText: `${PREFIX}-errorText`,
  circularProgress: `${PREFIX}-circularProgress`
};

const StyledSignUpForm = styled('div')({
  textAlign: "center",
  marginTop: 25,
  [`& .${classes.form}`]: {
    marginTop: 5,
    marginBottom: 20,
  },
  [`& .${classes.button}`]: {
    marginTop: 15,
    position: "relative",
    marginBottom: 15,
  },
  [`& .${classes.errorText}`]: {
    marginTop: 15,
  },
  [`& .${classes.circularProgress}`]: {
    position: "absolute",
  },
});

class SignUpForm extends Component {
  state = {
    email: null,
    password: null,
    confirmPassword: null,
    userHandle: null,
    errors: {},
  };

  componentWillReceiveProps(nextprops) {
    if (nextprops.UI.errors) {
      this.setState({ errors: nextprops.UI.errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userHandle: this.state.userHandle,
    };

    this.props.signupUser(newUserData, this.props.navigate);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let { UI: { loading } } = this.props;
    return (
      <StyledSignUpForm>
        <Typography variant="h5">Signup</Typography>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sm={8} md={7} xs={11}>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
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
                variant="standard"
                id="password"
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                fullWidth
                onChange={this.handleChange}
                margin="normal"
                helperText={this.state.errors.password}
                error={this.state.errors.password ? true : false} />
              <TextField
                variant="standard"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                fullWidth
                onChange={this.handleChange}
                margin="normal"
                helperText={this.state.errors.confirmPassword}
                error={this.state.errors.confirmPassword ? true : false} />
              <TextField
                variant="standard"
                id="userHandle"
                label="User Handle"
                type="text"
                name="userHandle"
                placeholder="Enter user handle"
                fullWidth
                onChange={this.handleChange}
                margin="normal"
                helperText={this.state.errors.userHandle}
                error={this.state.errors.userHandle ? true : false} />
              {this.state.errors.other && (
                <Typography color="error" className={classes.errorText}>
                  {this.state.errors.other.errMessage}
                </Typography>
              )}
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={loading && true}
                className={classes.button}
              >
                Signup
                {loading && (
                  <CircularProgress
                    className={classes.circularProgress}
                    size={25}
                  />
                )}
              </Button>
              <Typography variant="body2" component={"span"} display="block">
                Already have an account ? login{" "}
                <Link to="/auth/login">
                  <Typography color="primary" display="inline">
                    here
                  </Typography>
                </Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </StyledSignUpForm>
    )
  }
}
const WithNavigate = (props) => {
  let navigate = useNavigate();
  return <SignUpForm {...props} navigate={navigate} />;
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(WithNavigate);
