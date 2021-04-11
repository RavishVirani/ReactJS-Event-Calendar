import types from './../types/types';

export const eventsAddNew = (event) => ({
    type: types.AddNewevent,
    payload: event
});
export const eventsSetActive = (event) => ({
    type: types.SetActiveevent,
    payload: event
});
export const eventUpdated = (event) => ({
    type: types.Updatedevent,
    payload: event
});
export const eventDeleted = (event) => ({
    type: types.Deletedevent
});

export const CleanActiveEvent = (event) => ({
    type: types.cleanActiveEvent
});