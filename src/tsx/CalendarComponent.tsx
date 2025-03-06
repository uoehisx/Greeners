'use client';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "../css/CalendarComponent.css";
import MainSwipe from "./mainSwipe";

const CalendarComponent=()=>{
    return(
        <div>
        <div className="calendar-container">
            <FullCalendar 
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height="auto"
                headerToolbar={
                {
                    start:"prev next",
                    center:"title",
                    end:"",
                }}
                locale={'ko'}
            />
        </div>
        <div style={{marginTop:"20px"}}>
            <MainSwipe/>
        </div>
        </div>
    );
}
export default CalendarComponent;