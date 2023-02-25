import {
    SET_SUGESTION_ERRORS,
    CLEAR_SUGESTION_ERRORS,
    SET_SUGESTIONS,
    LOADING_SUGESTIONS,
    STOP_LOADING_SUGESTIONS,
} from '../types';

const initialState = {
    suggestions: [],
    loadingSuggestions: false,
    errors: null,
}

const suggestionsReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUGESTION_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        case CLEAR_SUGESTION_ERRORS:
            return {
                ...state,
                errors: null,
            }
        case LOADING_SUGESTIONS:
            return {
                ...state,
                loadingSuggestions: true,
            }
        case STOP_LOADING_SUGESTIONS:
            return {
                ...state,
                loadingSuggestions: false,
            }
        case SET_SUGESTIONS:
            return {
                ...state,
                suggestions: action.payload,
            }

        default:
            return state
    }
}

export default suggestionsReducers;