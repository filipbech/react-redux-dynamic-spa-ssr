import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware,
} from 'redux';

import ReduxThunk from 'redux-thunk'

import { appReducer } from './appReducer';
import { routingReducer } from './routingReducer';

import { settingsReducer } from './settingsReducer';
import { navigationReducer } from './navigationReducer';

// if you're also using redux-thunk, add it as a middleware
const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk))(createStore);

const rootReducer = combineReducers({
    app: appReducer,
    routing: routingReducer,
    settings: settingsReducer,
    navigation: navigationReducer
});

export default function configureStore(initialState = {}) {
    return createStoreWithMiddleware(rootReducer, initialState);
};
