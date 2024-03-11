import { useEffect, useState } from "react";
import {useDispatch,useSelector } from 'react-redux';
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { getAppointments } from "../../redux/slices/appointments/thunks";
import DetailAppointment from "../../components/detail/DetailAppointment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "../../components/calendar/DatePicker";
import dayjs from "dayjs";

import "dayjs/locale/es";
import "./Appointments.css";

dayjs.locale("es");



const Appointments = () => {

  const dispatch = useDispatch();
  const {appointments} = useSelector(state => state.appointment)
  console.log(appointments)
  useEffect(()=>{
    dispatch(getAppointments());
    
    
  },[dispatch])
// el seguindo useeffect solo es para consologuear por que cuando lo hacia en el primero
// me daba undefined por la asincronia
  useEffect(()=>{
    
    console.log(appointments)
    console.log(typeof appointments)
    
  },[appointments])


  const [date, setDate] = useState(dayjs());
  const localizer = dayjsLocalizer(dayjs);
  const handleChangeDate = (newDate) => {
    setDate(newDate);
  };

  const [open, setOpen] = useState(false);
  const [eventSelected, setEventSelected]= useState('')

  const openModal=(renderEvents)=>{
    console.log(renderEvents);
    setEventSelected(renderEvents)
    setOpen(true)
  }
  const closeModal=()=>{
    setOpen(false)
  }

  const searchEvents=(event)=>{
    console.log(event);
    const dni= event.dni
    const date = (dayjs(event.start)).format('DD/MM/YYYY');

    console.log(dni);
    console.log(date);

    const renderEvents= events.filter((event)=>{
      const date2 = (dayjs(event.start)).format('DD/MM/YYYY');
    if(date2 === date && event.dni === dni){
      return event
    }})

    openModal(renderEvents)

    console.log(renderEvents);
  }
  

  const events = [
    {
      title: "Perfilado de cejas",
      start: dayjs("2024-03-01T08:00:00").toDate(), // Cambiado a Date()
      end: dayjs("2024-03-01T08:00:00").add(30, "minute").toDate(), // Cambiado a Date()
      resource: 56789012,
      name: "andres",
      dni:35576770,
      id:12345
    },
    {
      title: "Lifting",
      start: dayjs("2024-03-01T09:00:00").toDate(), // Cambiado a Date()
      end: dayjs("2024-03-01T09:00:00").add(30, "minute").toDate(), // Cambiado a Date()
      resource: 12345678,
      name: "andres",
      dni:35576770,
      id:58792
    },
    {
      title: "Depilacion",
      start: dayjs("2024-03-01T11:00:00").toDate(), // Cambiado a Date()
      end: dayjs("2024-03-01T11:00:00").add(30, "minute").toDate(), // Cambiado a Date()
      resource: 23456789,
      name:'katy',
      dni:364300777,
      id:5721358
    },
  ];

  const professionals = [
    {
      dni: 12345678,
      name: "Carlos Sánchez",
      phone: "1234567890",
      mail: "carlos.sanchez@example.com",
    },
    {
      dni: 23456789,
      name: "María Rodríguez",
      phone: "9876543210",
      mail: "maria.rodriguez@example.com",
    },
    {
      dni: 34567890,
      name: "Juan Martínez",
      phone: "5558889999",
      mail: "juan.martinez@example.com",
    },
    {
      dni: 45678901,
      name: "Laura Gómez",
      phone: "7773331111",
      mail: "laura.gomez@example.com",
    },
    {
      dni: 56789012,
      name: "Pedro López",
      phone: "9990001111",
      mail: "pedro.lopez@example.com",
    },
    {
      dni: 67890123,
      name: "Ana Díaz",
      phone: "4443332222",
      mail: "ana.diaz@example.com",
    },
    {
      dni: 78901234,
      name: "Luis Pérez",
      phone: "1112223333",
      mail: "luis.perez@example.com",
    },
    {
      dni: 89012345,
      name: "Lucía Castro",
      phone: "6667778888",
      mail: "lucia.castro@example.com",
    },
    {
      dni: 98765432,
      name: "Marta Ruiz",
      phone: "2224446666",
      mail: "marta.ruiz@example.com",
    },
    {
      dni: 87654321,
      name: "Javier González",
      phone: "8889990000",
      mail: "javier.gonzalez@example.com",
    },
  ];



  // Estilo para renderizar eventos uno debajo del otro
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "green", // Color de fondo del evento
      color: "white", // Color del texto del evento
      borderRadius: "5px",
      border: "none",
      marginBottom: "10px", // Espacio entre eventos
    };
    return {
      style: style,
    };
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
          views={["day"]}
          defaultView="day"
          date={date.toDate()}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onNavigate={(newDate) => handleChangeDate(dayjs(newDate))}
          // components={{ event: DetailAppointment }} 
          onSelectEvent={(event)=>searchEvents(event)}
          resources={professionals}
          resourceAccessor="resource"
          resourceIdAccessor="dni"
          resourceTitleAccessor="name"
          timeslots={1}
          min={new Date(2024, 2, 25, 8, 0, 0)} // Configura el mínimo a las 8:00 AM
          max={new Date(2024, 2, 25, 21, 0, 0)} // Configura el máximo a las 9:00 PM
          eventPropGetter={eventStyleGetter}
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
          {/* Renderizar DetailAppointment solo cuando el modal esté abierto */}
          {open && (
            <DetailAppointment openModal={openModal} closeModal={closeModal} event={eventSelected} />
          )}
        </div>
      </div>
       <div>
       {appointments.length > 0 ? (
      appointments.map(item => (
        <div key={item.id}>
          <p>Cliente: {item.Client.name}</p>
          <p>DNI: {item.ClientDni}</p>
          <p>Servicio: {item.Service.service_name}</p>
          <p>Profesional: {item.Professional.name}</p>
        </div>
      ))
    ) : (
      <div>No hay citas disponibles</div>
    )}
       </div>   
    </div>
    
  );
};

export default Appointments;
