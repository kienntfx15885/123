
import rootReducer from './reducers';
import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const middleware = [thunk];

// if (process.env.REACT_APP_API_URL !== 'production') {
//     middleware.push(createLogger())
// }

const store = configureStore(
    {reducer: rootReducer},
    compose(applyMiddleware(middleware, createLogger()))
    );

export default store;






