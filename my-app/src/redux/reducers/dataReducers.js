import {
    SET_POSTS,
    SET_POST,
    UNSET_POST,
    LOADING_DATA,
    STOP_LOADING_DATA,
    SET_DATA_ERRORS,
    CLEAR_DATA_ERRORS,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    UPLOAD_POST,
    COMMENT_POST,
} from '../types';

const initialState = {
    posts: [],
    loadingData: false,
    errors: null,
    singlePost: null,
}

const dataReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case SET_POST:
            return {
                ...state,
                singlePost: action.payload
            }
        case UNSET_POST:
            return {
                ...state,
                singlePost: null,
            }
        case LOADING_DATA:
            return {
                ...state,
                loadingData: true,
            }
        case STOP_LOADING_DATA:
            return {
                ...state,
                loadingData: false,
            }
        case SET_DATA_ERRORS:
            return {
                ...state,
                errors: action.payload,
            }
        case CLEAR_DATA_ERRORS:
            return {
                ...state,
                errors: null,
            }
        case LIKE_POST:
            if (state.posts) {
                let index = state.posts.findIndex(post => post.id === action.payload.id)
                if (index >= 0) {
                    state.posts[index].likesCount++
                    if (state.singlePost && state.singlePost.id === state.posts[index].id) {
                        state.singlePost.likesCount++
                    }
                }
            }
            return {
                ...state,
            }
        case UNLIKE_POST:
            if (state.posts) {
                let index = state.posts.findIndex(post => post.id === action.payload.id)
                if (index >= 0) {
                    state.posts[index].likesCount--
                    if (state.singlePost && state.singlePost.id === state.posts[index].id) {
                        state.singlePost.likesCount--
                    }
                }
            }
            return {
                ...state,
            }
        case DELETE_POST:
            if (state.posts) {
                let index = state.posts.findIndex(post => post.id === action.payload.id)
                if (index >= 0) {
                    state.posts.splice(index, 1)
                }
            }
            return {
                ...state
            }
        case UPLOAD_POST:
            state.posts.unshift(action.payload)
            return {
                ...state
            }
        case COMMENT_POST:
            state.singlePost.comments.unshift(action.payload);
            state.singlePost.commentsCount++;
            let index = state.posts.findIndex(post => post.id === action.payload.postId);
            if (index >= 0) {
                state.posts[index].commentsCount++;
            }
            return {
                ...state
            }
        default:
            return state
    }
}

export default dataReducers;