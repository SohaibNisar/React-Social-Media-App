import {
    SET_STATIC_USER,
    UNSET_STATIC_USER,
    LOADING_STATIC_USER,
    STOP_LOADING_STATIC_USER,
    DELETE_POST,
    UPLOAD_POST,
    LIKE_POST,
    UNLIKE_POST,
    COMMENT_POST,
} from '../types';

const initialState = {
    loadingStaticUser: false,
    credentials: null,
    posts: [],
}

const staticUserReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATIC_USER:
            return {
                ...state,
                ...action.payload
            };
        case UNSET_STATIC_USER:
            return {
                loadingStaticUser: false,
                credentials: null,
                posts: [],
            };
        case LOADING_STATIC_USER:
            return {
                ...state,
                loadingStaticUser: true
            };
        case STOP_LOADING_STATIC_USER:
            return {
                ...state,
                loadingStaticUser: false
            };
        case LIKE_POST:
            if (state.posts) {
                let index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index >= 0) {
                    state.posts[index].likesCount++
                }
            }
            return {
                ...state,
            }
        case UNLIKE_POST:
            if (state.posts) {
                let index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index >= 0) {
                    state.posts[index].likesCount--
                }
            }
            return {
                ...state,
            }
        case DELETE_POST:
            if (state.posts) {
                let index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index >= 0) {
                    state.posts.splice(index, 1)
                }
            }
            return {
                ...state,
            }
        case UPLOAD_POST:
            let user = action.user;
            if (user.authenticated && user.credentials && state.credentials && user.credentials.userHandle === state.credentials.userHandle) {
                state.posts.unshift(action.payload)
            }
            return {
                ...state
            }
        case COMMENT_POST:
            let index = state.posts.findIndex(post => post.id === action.payload.postId);
            console.log(index)
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


export default staticUserReducers;