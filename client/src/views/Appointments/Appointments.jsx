import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { getAppointments, getProfessionals, getServices } from "../../redux/slices/appointments/thunks";
import DetailAppointment from "../../components/detail/DetailAppointment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "../../components/calendar/DatePicker";
import dayjs from "dayjs";
import NewBooking from "../../components/reserve/NewBooking";

import "dayjs/locale/es";
import "./Appointments.css";


dayjs.locale("es");

const Appointments = () => {
    const dispatch = useDispatch();
    const {appointments} = useSelector(state => state.appointment)
    const {professionals}=useSelector(state=>state.professionals)
    const [open, setOpen] = useState(false);
    const [eventSelected, setEventSelected] = useState("");
    const [openBooking, setOpenBooking] = useState(false);
    const [slotSelected, setSlotSelected]=useState('')
    const [events, setEvents]=useState([])
    
    useEffect(()=>{ //esto lo usamos para cargar los estados
      dispatch(getAppointments());  
      dispatch(getProfessionals())
      dispatch(getServices())
    },[dispatch])
 
  

  const [date, setDate] = useState(dayjs());
  const localizer = dayjsLocalizer(dayjs);

  const handleChangeDate = (newDate) => {
    setDate(newDate);
  };

 

    useEffect(()=>{

     if(appointments.length>0){
        const adapt= adaptAppointments(appointments)
        setEvents(adapt)
     }

    },[appointments,professionals])

  const adaptAppointments=(appointments)=>{
      const adaptEvents=  appointments.map((appointment)=>{
        return{
          title: appointment.Client.name,
          serviceName: appointment.Service.service_name,
          start: dayjs(`${appointment.date}T${appointment.time}`).toDate(), // Cambiado a Date()
          end: dayjs(`${appointment.date}T${appointment.time}`).add(30, "minute").toDate(), // Cambiado a Date()
          professionalDni: appointment.ProfessionalDni,
          nameClient: appointment.Client.name,
          dniClient: appointment.ClientDni,
          nameProfessional:appointment.Professional.name,
          idAppointment: appointment.id,
          cost: appointment.Service.cost
        }
      })
// console.log('Estoy en adaptAppointment',adaptEvents);
      return adaptEvents
  }

  const openModal = (renderEvents) => {
    console.log(renderEvents);
    setEventSelected(renderEvents);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };



  const searchEvents = (event) => {
    console.log(event);
    const dni = event.dniClient;
    const date = dayjs(event.start).format("DD/MM/YYYY");

    console.log(dni);
    console.log(date);

    const renderEvents = events.filter((event) => {
      const date2 = dayjs(event.start).format("DD/MM/YYYY");
      if (date2 === date && event.dniClient === dni) {
        return event;
      }
    });

    openModal(renderEvents);

    console.log(renderEvents);
  };

  const handleSelectSlot = (infoSlot) => {
    console.log("Hora de inicio seleccionada: ", infoSlot);
    setSlotSelected(infoSlot)
    setOpenBooking(true)
  };

  const eventsMockup = [
    {
      title: "Perfilado de cejas",
      start: dayjs("2024-03-01T08:00:00").toDate(), // Cambiado a Date()
      end: dayjs("2024-03-01T08:00:00").add(30, "minute").toDate(), // Cambiado a Date()
      resource: 56789012,
      name: "andres",
      dni: 35576770,
      id: 12345,
    },
    {
      title: "Lifting",
      start: dayjs("2024-03-01T09:00:00").toDate(), // Cambiado a Date()
      end: dayjs("2024-03-01T09:00:00").add(30, "minute").toDate(), // Cambiado a Date()
      resource: 12345678,
      name: "andres",
      dni: 35576770,
      id: 58792,
    },
    {
      title: "Depilacion",
      start: dayjs("2024-03-01T11:00:00").toDate(), // Cambiado a Date()
      end: dayjs("2024-03-01T11:00:00").add(30, "minute").toDate(), // Cambiado a Date()
      resource: 23456789,
      name: "katy",
      dni: 364300777,
      id: 5721358,
    },
  ];

  const professionalsMockup = [
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

  // console.log('Soy el estado que contiene los profesionales',professionals);
  // console.log('Soy el estado que contiene lo turnos', appointments);
  // console.log('Eventos adaptados', events);
 
  // Estilo para renderizar eventos uno debajo del otro
  const eventStyleGetter = (event, start, end, isSelected) => {
    return{
    style : {
      backgroundColor: "green", // Color de fondo del evento
      color: "white", // Color del texto del evento
      borderRadius: "5px",
      border: "none",
      marginBottom: "10px", // Espacio entre eventos
    },
    }
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
          onSelectEvent={(event) => searchEvents(event)}
          onSelectSlot={handleSelectSlot}
          resources={professionals}
          resourceAccessor="professionalDni"
          resourceIdAccessor="dni"
          resourceTitleAccessor="name"
          timeslots={1}
          min={new Date(2024, 2, 25, 8, 0, 0)} // Configura el mínimo a las 8:00 AM
          max={new Date(2024, 2, 25, 21, 0, 0)} // Configura el máximo a las 9:00 PM
          eventPropGetter={eventStyleGetter}
          selectable={true}
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
          <NewBooking  openBooking={openBooking} setOpenBooking={setOpenBooking} slotSelected={slotSelected} />
          {/* Renderizar DetailAppointment solo cuando el modal esté abierto */}
          {open && (
            <DetailAppointment
              openModal={openModal}
              closeModal={closeModal}
              event={eventSelected}
              setEventSelected={setEventSelected}
            />
          )}
        </div>
      </div>
      {/* <div>
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
       </div>    */}
    </div>
  );
};

export default Appointments;
