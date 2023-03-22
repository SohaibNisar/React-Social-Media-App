import React, { Component } from "react";
import { useParams } from "react-router-dom";

// components
import Navbar from "../components/layout/navbar";
import Profile from "../components/profile/profile";
import ProfileSkeleton from "../util/ProfileSkeleton";

// redux
import store from "../redux/store";
import { connect } from "react-redux";
import { getStaticUserData } from "../redux/actions/staticUserActions";
import { UNSET_STATIC_USER } from "../redux/types";

class User extends Component {
  state = {
    handle: null,
  };

  componentDidMount() {
    let {
      params: { handle },
    } = this.props;
    this.setState({ handle });
    this.props.getStaticUserData(handle);
  }

  componentWillReceiveProps(nextProps) {
    let {
      params: { handle },
    } = nextProps;
    if (handle !== this.state.handle && this.state.handle !== null) {
      this.setState({ handle });
      this.props.getStaticUserData(handle);
    }
  }

  componentWillUnmount() {
    store.dispatch({ type: UNSET_STATIC_USER });
  }

  render() {
    let { staticUser, authenticated, user } = this.props;

    return (
      <>
        {!authenticated && <Navbar />}
        {user.loadingUser || staticUser.loadingStaticUser ? (
          <ProfileSkeleton />
        ) : (
          <Profile key={this.state.handle} />
        )}
      </>
    );
  }
}

const WtihParams = (props) => {
  let params = useParams();
  return <User {...props} params={params} />;
};

const mapStateToProps = (state) => ({
  staticUser: state.staticUser,
  authenticated: state.user.authenticated,
  user: state.user,
});

const mapActionsToProps = {
  getStaticUserData,
};

export default connect(mapStateToProps, mapActionsToProps)(WtihParams);
