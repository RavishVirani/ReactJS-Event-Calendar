// import types from './../types/types';
import moment from 'moment';
import types from './../types/types';


const initialState = {
    events: [
        {
            title: 'Today',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: "#fafafa",
            notes: "Today's Date",
            user: {
                _id: '123',
                name: 'RSV'
            }
        }
    ],
    eventActive: null
}

export const CalendarReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.AddNewevent:
            return {
                ...state,
                events: [...state.events, payload]
            }
        case types.SetActiveevent:
            return {
                ...state,
                eventActive: payload
            }
        case types.Updatedevent:
            return {
                ...state,
                events: state.events.map(item => (item.id === payload.id) ? payload : item)
            }
        case types.Deletedevent:
            return {
                ...state,
                events: state.events.filter(item => (item.id !== state.eventActive.id)),
                eventActive: null
            }
        case types.cleanActiveEvent:
            return {
                ...state,
                eventActive: null
            }
        default:
            return state
    }
}
export default CalendarReducer;
