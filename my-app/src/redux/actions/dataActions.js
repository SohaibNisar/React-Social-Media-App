import {
  SET_POSTS,
  LOADING_DATA,
  STOP_LOADING_DATA,
  SET_DATA_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  CLEAR_ERRORS,
  CLEAR_DATA_ERRORS,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  UPLOAD_POST,
  SET_ERRORS,
  SET_POST,
  COMMENT_POST,
} from "../types";
import axios from "axios";

export const uploadPost = (data) => (dispatch, getState) => {
  dispatch({ type: LOADING_UI });
  axios({
    method: "POST",
    url: "/post",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: CLEAR_DATA_ERRORS });
      dispatch({
        type: UPLOAD_POST,
        payload: res.data,
        user: getState().user,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data && err.response.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: CLEAR_DATA_ERRORS });
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_DATA });
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};

export const likePost = (postId) => (dispatch) => {
  axios
    .post(`/post/${postId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: {
          id: postId,
        },
      });
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};

export const unlikePost = (postId) => (dispatch) => {
  axios
    .post(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: {
          id: postId,
        },
      });
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: { id: postId },
      });
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};

export const getSinglePost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postId}`)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

export const commentPost = (postId, data) => (dispatch) => {
  axios
    .post(`/post/${postId}/comment`, data)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: COMMENT_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      if (!err.response) {
        console.log(err);
        return;
      }
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

const setError = (err) => (dispatch) => {
  if (err.response) {
    dispatch({
      type: SET_DATA_ERRORS,
      payload: err.response.data,
    });
  } else {
    dispatch({
      type: SET_DATA_ERRORS,
      payload: { ...err },
    });
    console.log("axios" + err);
  }
};
