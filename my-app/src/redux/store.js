import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducers from "./reducers/userReducers";
import uiReducers from "./reducers/uiReducers";
import dataReducers from "./reducers/dataReducers";
import suggestionsReducers from "./reducers/suggestionsReducers";
import staticUserReducers from "./reducers/staticUserReducers";

const initialState = {};

const reducers = combineReducers({
    data: dataReducers,
    UI: uiReducers,
    user: userReducers,
    suggestions: suggestionsReducers,
    staticUser: staticUserReducers,
});

const rootReducer = (state, action) => {
    if (action.type === 'SET_UNAUTHENTICATED') {
        state = undefined
    }
    return reducers(state, action)
}

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;