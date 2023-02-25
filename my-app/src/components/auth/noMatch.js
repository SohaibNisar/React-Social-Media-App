import React, { Component } from "react";

// components
import Navbar from '../layout/navbar';

// redux
import { connect } from 'react-redux';

class NoMatch extends Component {
  render() {
    return (
      <>
        {this.props.authenticated ?
          <div>404 Not Found</div> :
          <>
            <Navbar />
            <div>404 Not Found</div>
          </>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(NoMatch);
