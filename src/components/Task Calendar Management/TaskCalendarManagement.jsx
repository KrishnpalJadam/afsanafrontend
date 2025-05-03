import  { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables drag & click

const TaskCalendarManagement = () => {
  const [events, setEvents] = useState([
    { title: "Meeting", date: "2025-02-12" },
    { title: "Project Deadline", date: "2025-02-15" },
  ]);

  // Function to add a new event
  const handleDateClick = (info) => {
    const eventTitle = prompt("Enter event title:");
    if (eventTitle) {
      setEvents([...events, { title: eventTitle, date: info.dateStr }]);
    }
  };

  return (
    <div className="container mt-4"  >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        dateClick={handleDateClick} // Function triggers on date click
        height="90vh" // Makes it full screen
      />
    </div>
  );
};

export default TaskCalendarManagement;
