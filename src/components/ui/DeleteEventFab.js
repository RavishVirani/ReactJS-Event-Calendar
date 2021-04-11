import React from 'react'
import { eventDeleted } from '../../actions/events';
import { useDispatch } from 'react-redux';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();
    const handleClick = (e)=>{
        dispatch(eventDeleted());
    }
    return (
            <button
            onClick={handleClick}
            className="btn btn-danger fab-danger">
                <i className="fas fa-trash"></i>
                <span>  Delete Event</span>
            </button>
    )
}
