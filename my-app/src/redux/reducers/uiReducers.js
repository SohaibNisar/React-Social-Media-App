import { CLEAR_ERRORS, SET_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../types';

const initialState = {
    loading: false,
    errors: null
}

const uiReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        default:
            return state
    }
}

export default uiReducers;