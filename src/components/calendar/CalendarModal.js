import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {uiCloseModal } from './../../actions/ui';
import { eventsAddNew } from '../../actions/events';
import { CleanActiveEvent, eventUpdated } from './../../actions/events';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')
const now = moment().minute(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.add(1, 'hours');
const initState ={
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {
    const dispatch = useDispatch();
    const  {isOpenModal} = useSelector(state => state.ui);
    const  {eventActive} = useSelector(state => state.calendar);
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);
    const [formValues, setFormValues] = useState(initState)

    const { title, notes, start, end } = formValues;

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(CleanActiveEvent());
        setFormValues(initState)
    }
    const handleStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handleEndDateChange = (e) => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }
    const handleChangeValue = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const startMoment = moment(start);
        const endMoment = moment(end);
        if (startMoment.isSameOrAfter(endMoment)) {
            return Swal.fire('Error ',' End date must be greater than start date ',' error')
        }

        if (title.trim().length < 2) {
            return setIsTitleInvalid(true);
        }

        setIsTitleInvalid(false);
        if(eventActive){
            dispatch(eventUpdated(formValues));
        }else{
            dispatch(eventsAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'RSV'
                }
            }));
        }
        closeModal()
    }
    useEffect(() => {
       if(eventActive){
            setFormValues(eventActive);
        }else{
            setFormValues(initState);
       }
    }, [eventActive])
    
    return (        
        <Modal
            isOpen={isOpenModal}
            closeTimeoutMS={200}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> Add Event </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Start Date and Time</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleStartDateChange}
                        maxDate={dateEnd}
                        value={dateStart}
                    />
                </div>

                <div className="form-group">
                    <label>End Date and Time</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleEndDateChange}
                        minDate={dateStart}
                        value={dateEnd}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Title/Notes</label>
                    <input
                        type="text"
                        className={`form-control ${isTitleInvalid && 'is-invalid'}`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleChangeValue}
                    />
                    <small id="emailHelp" className="form-text text-muted">Event Details</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleChangeValue}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Addiotional Information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span>  Save</span>
                </button>

            </form>
        </Modal>
    )
}
