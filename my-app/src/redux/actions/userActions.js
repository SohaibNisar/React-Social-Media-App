import {
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_USER,
  STOP_LOADING_USER,
  LOADING_STATIC_USER,
  STOP_LOADING_STATIC_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_AUTHENTICATED,
  SET_USER,
  SET_STATIC_USER,
  // CLEAR_SUGESTION_ERRORS,
  ADD_FRIEND,
  UNFRIEND,
  CONFIRM_FRIEND,
  CANCEL_REQUEST,
} from "../types";
import { getStaticUserData } from "./staticUserActions";
import axios from "axios";

export const loginUser = (userData, navigate) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      let FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      // axios.defaults.headers.common['Authorization'] = FBIdToken;
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      dispatch(getUserData());
      dispatch({ type: STOP_LOADING_UI });
      navigate("/");
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: SET_ERRORS,
          payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_UI });
      } else if (error.request) {
        if (error.toJSON().message === "Network Error") {
          dispatch({
            type: SET_ERRORS,
            payload: {
              other: {
                message: "network related issue by axios",
                errMessage: "network error",
              },
            },
          });
          dispatch({ type: STOP_LOADING_UI });
        } else {
          dispatch({
            type: SET_ERRORS,
            payload: {
              other: {
                message: "issue by axios",
                errMessage: "something went wrong",
              },
            },
          });
          dispatch({ type: STOP_LOADING_UI });
        }
      } else {
        dispatch({
          type: SET_ERRORS,
          payload: {
            other: {
              message: "issue by axios",
              errMessage: "something went wrong",
            },
          },
        });
        dispatch({ type: STOP_LOADING_UI });
      }
    });
};

export const signupUser = (newUserData, navigate) => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      let FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      // console.log(FBIdToken)
      // axios.defaults.headers.common['Authorization'] = FBIdToken;
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      dispatch(getUserData());
      dispatch({ type: STOP_LOADING_UI });
      navigate("/");
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: SET_ERRORS,
          payload: error.response.data,
        });
        dispatch({ type: STOP_LOADING_UI });
      } else if (error.request) {
        if (error.toJSON().message === "Network Error") {
          dispatch({
            type: SET_ERRORS,
            payload: {
              other: {
                message: "network related issue by axios",
                errMessage: "network error",
              },
            },
          });
          dispatch({ type: STOP_LOADING_UI });
        } else {
          dispatch({
            type: SET_ERRORS,
            payload: {
              other: {
                message: "issue by axios",
                errMessage: "something went wrong",
              },
            },
          });
          dispatch({ type: STOP_LOADING_UI });
        }
      } else {
        dispatch({
          type: SET_ERRORS,
          payload: {
            other: {
              message: "issue by axios",
              errMessage: "something went wrong",
            },
          },
        });
        dispatch({ type: STOP_LOADING_UI });
      }
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/authenticUser")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_USER });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_USER,
        payload: {
          credentials: null,
          notifications: null,
          likes: [],
          loading: true,
        },
      });
    });
};

export const editProfile = (data, userHandle) => (dispatch) => {
  dispatch({ type: LOADING_STATIC_USER });
  dispatch({ type: LOADING_USER });
  dispatch({
    type: SET_USER,
    payload: {
      credentials: null,
      notifications: null,
      likes: [],
    },
  });
  dispatch({
    type: SET_STATIC_USER,
    payload: {
      credentials: null,
      posts: [],
    },
  });
  axios({
    method: "POST",
    url: "/user/editProfile",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      dispatch(getUserData());
      dispatch(getStaticUserData(userHandle));
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: STOP_LOADING_USER });
      dispatch({ type: STOP_LOADING_STATIC_USER });
    });
};

export const addFriend = (userHandle) => (dispatch) => {
  axios
    .post(`/friendRequest/${userHandle}`)
    .then((res) => {
      dispatch({
        type: ADD_FRIEND,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const cancelRequest = (userHandle) => (dispatch) => {
  axios
    .delete(`/friendRequest/${userHandle}`)
    .then((res) => {
      // dispatch({ type: CLEAR_SUGESTION_ERRORS })
      dispatch({
        type: CANCEL_REQUEST,
        payload: { userHandle },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unfriend = (userHandle) => (dispatch) => {
  axios
    .delete(`/unFriend/${userHandle}`)
    .then((res) => {
      // dispatch({ type: CLEAR_SUGESTION_ERRORS })
      dispatch({
        type: UNFRIEND,
        payload: { userHandle },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const confirmRequest = (userHandle) => (dispatch) => {
  axios
    .post(`/confirmFriendRequest/${userHandle}`)
    .then((res) => {
      // dispatch({ type: CLEAR_SUGESTION_ERRORS })
      dispatch({
        type: CONFIRM_FRIEND,
        payload: { userHandle },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
