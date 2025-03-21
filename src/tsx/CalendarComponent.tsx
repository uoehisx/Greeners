'use client';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "../css/CalendarComponent.css";
import MainSwipe from "./mainSwipe";
import Popup from "./Popup.tsx";

const earnedBadges: Record<string, string[]> = {
  "2025-02-15": ["/assets/badge1.png"],
  "2025-03-01": ["/assets/badge2.png"],
};

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
          selectable={true}  // 날짜 선택 가능하게 설정
          select={(info) => {
            console.log("날짜 선택됨:", info.startStr);
            if (earnedBadges.hasOwnProperty(info.startStr)) {
              setSelectedDate(info.startStr);
            } else {
              setSelectedDate(null);
            }
          }}
          events={Object.keys(earnedBadges).map((date) => ({
            title: "🎖",
            start: date,
            className: "badge-date",
          }))}
          locale="ko"
        />
      </div>

      {selectedDate && earnedBadges[selectedDate]?.length > 0 && (
        <Popup
          message="🎖 획득한 뱃지!"
          badgeImage={earnedBadges[selectedDate][0]}
          onClose={() => setSelectedDate(null)}
        />
      )}

      <div style={{ marginTop: "20px" }}>
        <MainSwipe />
      </div>
    </div>
  );
};

export default CalendarComponent;
