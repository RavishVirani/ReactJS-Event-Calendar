import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { uiReducer } from './../reducers/uiReducer';
import { CalendarReducer } from './../reducers/calendarReducer';


const reducers = combineReducers({
    ui: uiReducer,
    calendar: CalendarReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers,
    composeEnhancers(applyMiddleware(thunk))
);