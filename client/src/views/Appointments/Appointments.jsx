import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "../../components/calendar/DatePicker";
import dayjs from "dayjs";

 
const Appointments = () => {
  const [date, setDate] = useState(dayjs());
  console.log("Fecha de en el componente appointment:", date);
  const localizer = dayjsLocalizer(dayjs);

  const handleChangeDate = (newDate) => {
    console.log("soy value que vengo desde datepicker:", newDate);
    setDate(newDate);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        // border: "solid 2px blue",
      }}>
      <div
        style={{
          height: "100%",
          width: "70%",
          // border: "solid 2px yellow",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center", // Centrar horizontalmente
          alignItems: "center", // Centrar verticalmente
        }}>
        <Calendar
          localizer={localizer}
          style={{ height: "90%", width: "100%" }}
          view="day"
          date={date.toDate()}
          startAccessor='start'
          endAccessor='end'
          events={[ {
            title: 'Event 1',
            start: new Date(),
            end: new Date(new Date().setHours(new Date().getHours() + 1)),
          }]}
          onNavigate={(newDate) => handleChangeDate(dayjs(newDate))}
          step={30}
          timeslots={2}
        />
      </div>
      <div
        style={{
          height: "100%",
          width: "30%",
          // border: "solid 2px green",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center", // Centrar horizontalmente
          alignItems: "start", // Centrar verticalmente
        }}>
        <div
          style={{
            marginTop: "10px",
            width: "100%",
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "row",
            marginRight: "20px",
          }}>
          <DatePicker date={date} handleChangeDate={handleChangeDate} />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
