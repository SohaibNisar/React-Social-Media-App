import {
    SET_SUGESTION_ERRORS,
    CLEAR_SUGESTION_ERRORS,
    SET_SUGESTIONS,
    LOADING_SUGESTIONS,
    STOP_LOADING_SUGESTIONS,
} from '../types';
import axios from 'axios';

export const getSuggestions = () => (dispatch) => {
    dispatch({ type: LOADING_SUGESTIONS })
    axios.get('/allUsers').then(res => {
        dispatch({ type: CLEAR_SUGESTION_ERRORS })
        dispatch({
            type: SET_SUGESTIONS,
            payload: res.data
        })
        dispatch({ type: STOP_LOADING_SUGESTIONS })
    }).catch(err => {
        setError(err)
        dispatch({ type: STOP_LOADING_SUGESTIONS })
    })
}

const setError = (err) => (dispatch) => {
    if (err.response) {
        if (err.response.data) {
            dispatch({
                type: SET_SUGESTION_ERRORS,
                payload: err.response.data
            })
        }
    } else if (err.request) {
        if (err.toJSON().message === 'Network Error') {
            dispatch({
                type: SET_SUGESTION_ERRORS,
                payload: {
                    other: {
                        message: "network related issue by axios",
                        errMessage: "network error"
                    }
                }
            })
        } else {
            dispatch({
                type: SET_SUGESTION_ERRORS,
                payload: err
            })
        }
    } else {
        dispatch({
            type: SET_SUGESTION_ERRORS,
            payload: err
        })
    }
    console.log(err)
}