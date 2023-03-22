import React, { Component } from "react";

// commponents
import DesktopVersion from "../components/friends/desktopVersion";
import MobileVersion from "../components/friends/mobileVersion";
import FriendsDesktopSkeleton from "../util/friendsDesktopSkeleton";
import FriendsMobileSkeleton from "../util/friendsMobileSkeleton";

// redux
import { connect } from "react-redux";
import { getSuggestions } from "../redux/actions/suggestionActions";

class Friends extends Component {
  state = {
    mobile: false,
  };

  componentDidMount() {
    this.props.getSuggestions();
    let mediaQueryList = window.matchMedia("(max-width:720px)");
    if (mediaQueryList.matches) {
      this.setState({ mobile: true });
    }
    mediaQueryList.addEventListener("change", (e) => {
      if (e.matches) {
        this.setState({ mobile: true });
      } else {
        this.setState({ mobile: false });
      }
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    let { loadingUser, loadingSuggestions } = this.props;
    return (
      <>
        {!this.state.mobile ? (
          !loadingUser && !loadingSuggestions ? (
            <DesktopVersion />
          ) : (
            <FriendsDesktopSkeleton />
          )
        ) : !loadingUser && !loadingSuggestions ? (
          <MobileVersion />
        ) : (
          <FriendsMobileSkeleton />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingUser: state.user.loadingUser,
  loadingSuggestions: state.suggestions.loadingSuggestions,
});

const mapActionsToProps = {
  getSuggestions,
};

export default connect(mapStateToProps, mapActionsToProps)(Friends);
