import React, { Component } from "react";

// mui
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Divider, Typography } from "@mui/material";

// redux
import { connect } from "react-redux";
import { unfriend } from "../../../redux/actions/userActions";

class Unfriend extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  unFriend = (friendUserHandle) => {
    this.props.unfriend(friendUserHandle);
    this.setState({ open: false });
  };

  render() {
    let {
      user: { authenticated },
      friendUserHandle,
    } = this.props;
    return (
      <>
        {authenticated && (
          <>
            <Button
              variant="contained"
              color="primary"
              component="span"
              size="small"
              onClick={this.handleClickOpen}
              sx={{...this.props.btnStyle}}
            >
              <Typography variant="caption">Unfriend</Typography>
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>
                <Typography style={{ fontWeight: "bold" }}>
                  Unfriend {`${friendUserHandle}`}
                </Typography>
              </DialogTitle>
              <Divider variant="middle" />
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to remove {`@${friendUserHandle}`} as
                  your friend?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleClose}
                  color="primary"
                  style={{ fontWeight: "bold" }}
                >
                  CANCEL
                </Button>
                <Button
                  onClick={() => this.unFriend(friendUserHandle)}
                  color="secondary"
                  style={{ fontWeight: "bold" }}
                >
                  Remove
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  unfriend,
};

export default connect(mapStateToProps, mapActionsToProps)(Unfriend);
