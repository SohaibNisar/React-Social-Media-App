import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./App.css";

//components
import Navbar from "./components/layout/navbar";
import NoMatch from "./components/auth/noMatch";
import themeObject from "./util/theme";

// pages
import Home from "./pages/home";
import Friends from "./pages/friends";
import Login from "./pages/login";
import User from "./pages/user";

// mui
import { ThemeProvider, createTheme } from "@mui/material/styles/";

// redux
import store from "./redux/store";
import { connect } from "react-redux";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";
axios.defaults.baseURL =
  "http://localhost:5000/socialmediaapp-53549/us-central1/api/";

let theme = createTheme(themeObject);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 > Date.now()) {
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(getUserData());
  } else {
    store.dispatch({ type: SET_UNAUTHENTICATED });
  }
} else {
  store.dispatch({ type: SET_UNAUTHENTICATED });
}

let App = (props) => {
  const authenticated = props.user.authenticated;
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container">
          {authenticated && <Navbar />}
          <Routes>
            {authenticated ? (
              <>
                <Route exact="true" path="/" element={<Home />} />
                <Route path="/friends" element={<Friends />} />
              </>
            ) : <Route exact path="/" element={<Navigate to="/auth/login" />} />}
            <Route path="/friends" element={<Navigate to="/auth/login" />} />
            <Route path="/auth" element={<Navigate to="/auth/login" />} />
            <Route path="/auth/:page?" element={<Login />} />
            <Route path="/user/:handle" element={<User />} />
            <Route path="/user/:handle/post/:postId" element={<User openPostDialog/>} />
            <Route path="/404" element={<NoMatch />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
