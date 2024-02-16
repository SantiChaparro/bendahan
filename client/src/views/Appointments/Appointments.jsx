import * as React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Box, ThemeProvider, createTheme } from "@mui/system";
// import CalendarDate from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import DateCalendar from "../../components/calendar/DateCalendar";

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
      red: "red",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#009688",
    },
  },
});

const Appointments = () => {
  const localizer = momentLocalizer(moment);

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
          width: "60%",
          // border: "solid 2px yellow",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center", // Centrar horizontalmente
          alignItems: "center", // Centrar verticalmente
        }}>
        <Calendar
          localizer={localizer}
          style={{ height: "80%", width: "70%", border: "solid 2px orange" }}
        />
      </div>
      <div
        style={{
          height: "100%",
          width: "40%",
          border: "solid 2px green",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center", // Centrar horizontalmente
          alignItems: "center", // Centrar verticalmente
        }}>
        <DateCalendar />  
      </div>
    </div>
  );
};

export default Appointments;
