import React, { useState } from 'react'
import moment from 'moment'
import 'moment/locale/en-ca';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helper/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from './../../actions/ui';
import { eventsSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/addNewFab';
import { DeleteEventFab } from './../ui/DeleteEventFab';
import { CleanActiveEvent } from './../../actions/events';

moment.locale('en-ca')
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const { events,eventActive } = useSelector(state => state.calendar);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
        }
        return {
            style
        }
    }
    const onDoubleClickEvent = (e) => {
        dispatch(uiOpenModal());
    }
    const onSelectEvent = (e) => {
        dispatch(eventsSetActive(e))
    }
    const onView = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }
    const onSelectSlot = (e) => {
        console.log('slot..',e)
        dispatch(CleanActiveEvent())
    }
    
    return (
        <div className="calendar-screen">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClickEvent}
                onSelectEvent={onSelectEvent}
                selectable={true}
                onSelectSlot={onSelectSlot}
                onView={onView}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            {
                (eventActive) && <DeleteEventFab/>
            }
            <CalendarModal />
        </div>
    )
}
