import React, { Component } from "react";

// component
import MyButton from "../../../util/myButton";

// mui
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogTitle,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// mui icons
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

// redux
import store from "../../../redux/store";
import { connect } from "react-redux";
import { uploadPost } from "../../../redux/actions/dataActions";
import { CLEAR_ERRORS, CLEAR_DATA_ERRORS } from "../../../redux/types";

const PREFIX = "uploadPost";

const classes = {
  dialogTitle: `${PREFIX}-dialogTitle`,
  closeButton: `${PREFIX}-closeButton`,
  submitButton: `${PREFIX}-submitButton`,
  uploadPhoto: `${PREFIX}-uploadPhoto`,
  form: `${PREFIX}-form`,
  mediaFile: `${PREFIX}-mediaFile`,
  showImage: `${PREFIX}-showImage`,
  showImageTag: `${PREFIX}-showImageTag`,
  cancleImage: `${PREFIX}-cancleImage`,
  circularProgress: `${PREFIX}-circularProgress`,
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.dialogTitle}`]: {
    paddingBottom: "0px",
  },

  [`& .${classes.closeButton}`]: {
    position: "absolute",
    top: "4px",
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  [`& .${classes.submitButton}`]: {
    marginBottom: "20px",
  },

  [`& .${classes.uploadPhoto}`]: {
    margin: "20px 0",
  },

  [`& .${classes.form}`]: {
    textAlign: "center",
  },

  [`& .${classes.mediaFile}`]: {
    display: "none",
  },

  [`& .${classes.showImage}`]: {
    position: "relative",
    display: "inline-block",
  },

  [`& .${classes.showImageTag}`]: {
    border: "1px solid gray",
    borderRadius: "10px",
    marginTop: "20px",
    maxWidth: "100%",
  },

  [`& .${classes.cancleImage}`]: {
    position: "absolute",
    right: "8px",
    top: "28px",
    color: theme.palette.grey[500],
    backgroundColor: "white",
  },

  [`& .${classes.circularProgress}`]: {
    position: "absolute",
  },
}));

class UploadPost extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      body: null,
      localFile: null,
      serverFile: null,
      errors: {},
    };
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.UI.errors && nextprops.UI.errors !== this.state.errors) {
      this.setState({
        errors: nextprops.UI.errors,
      });
    }
    if (!nextprops.UI.errors && !nextprops.UI.loading) {
      this.setState({
        open: false,
        body: null,
        localFile: null,
        serverFile: null,
        errors: {},
      });
    }
  }

  handleChange = (e) => {
    if (e.target.name === "file" && e.target.files.length > 0) {
      this.setState({
        localFile: URL.createObjectURL(e.target.files[0]),
        serverFile: e.target.files[0],
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleClickOpen = () => {
    if (this.props.credentials) {
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
      body: null,
      localFile: null,
      serverFile: null,
      errors: {},
    });
    store.dispatch({ type: CLEAR_ERRORS });
    store.dispatch({ type: CLEAR_DATA_ERRORS });
  };

  cancleImage = () => {
    this.setState({
      localFile: null,
      serverFile: null,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("body", this.state.body);
    formData.append("image", this.state.serverFile);
    this.props.uploadPost(formData);
  };

  render() {
    const {
      UI: { loading },
      credentials,
    } = this.props;
    let userHandle;
    if (credentials) userHandle = credentials.userHandle;
    return (
      <>
        <div onClick={this.handleClickOpen}>
          <MyButton
            tip="Create a Post"
            color="inherit"
            content={<AddIcon />}
            disabled={!this.props.credentials && true}
          />
        </div>
        <StyledDialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle className={classes.dialogTitle}>
            <Typography
              sx={{ fontWeight: "bold" }}
              component={Typography}
              color="primary"
            >
              {/* Delete Post */}
              Create a Post
            </Typography>
          </DialogTitle>
          <div onClick={this.handleClose}>
            <MyButton
              tip="Close"
              content={<CloseIcon />}
              className={classes.closeButton}
            />
          </div>
          <DialogContent>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant="standard"
                id="body"
                label={this.state.errors.postBody ? "Enter Text" : null}
                type="text"
                name="body"
                placeholder={`What's on you mind, ${userHandle} ?`}
                multiline
                fullWidth
                onChange={this.handleChange}
                helperText={this.state.errors.postBody}
                focused={this.state.errors.postBody ? true : false}
                error={this.state.errors.postBody ? true : false}
              />
              <input
                accept="image/*"
                className={classes.mediaFile}
                id="mediaFile"
                name="file"
                multiple={false}
                type="file"
                onChange={this.handleChange}
              />
              {this.state.localFile && (
                <span className={classes.showImage}>
                  <img
                    src={this.state.localFile}
                    alt="media"
                    className={classes.showImageTag}
                  />
                  <span>
                    <IconButton
                      color="inherit"
                      className={classes.cancleImage}
                      size="small"
                      onClick={this.cancleImage}
                    >
                      <CloseIcon />
                    </IconButton>
                  </span>
                </span>
              )}
              <Typography
                component="span"
                display="block"
                className={classes.uploadPhoto}
              >
                <label htmlFor="mediaFile">
                  <Button variant="contained" color="primary" component="span">
                    Add a photo
                  </Button>
                </label>
              </Typography>
              {this.state.errors.uploadPost && (
                <Typography color="error" className={classes.errorText}>
                  {this.state.errors.other.uploadPost}
                </Typography>
              )}
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={loading && true}
                className={classes.submitButton}
              >
                Post
                {loading && (
                  <CircularProgress
                    className={classes.circularProgress}
                    size={25}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </StyledDialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
  credentials: state.user.credentials,
});

const mapActionsToProps = {
  uploadPost,
};

export default connect(mapStateToProps, mapActionsToProps)(UploadPost);
