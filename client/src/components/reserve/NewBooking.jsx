import { useState } from "react";
import { useSelector } from "react-redux";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import BasicDatePicker from "../calendar/DatePicker";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAppointments } from "../../redux/slices/appointments/thunks";

const NewBooking = ({ openBooking, setOpenBooking, slotSelected }) => {
  // console.log("Recibi este slot: ", slotSelected);
  const dispatch = useDispatch();

  const { professionals } = useSelector((state) => state.professionals);
  const { services } = useSelector((state) => state.services);
  // console.log("Estos son los servicios: ", services);
  // console.log("Estos son los professionales: ", professionals);

  const [newAppointment, setNewAppointment] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    time: "",
    // end: "",
    dni: "",
    professionalDni: "",
    serviceId: "",
  });

  const [error, setError] = useState(false);

  const validateStatus = (prop) => {};

  // const dateSlot= dayjs(slotSelected.start).format('DD-MM-YYYY')
  // const endSlot= dayjs(slotSelected.end).format('HH:mm')
  // const startSlot= dayjs(slotSelected.start).format('HH:mm')
  // const resourceSlot= slotSelected.resourceId

  // setNewAppointment({...newAppointment, date:dateSlot,start:startSlot, end:endSlot, professional: resourceSlot })

  // console.log('Date' ,dateSlot);
  // console.log('End',endSlot);
  // console.log('Start',startSlot);
  // console.log('Profesional',resourceSlot);

  const handleOpen = () => {
    setOpenBooking(true);
  };

  const handleClose = () => {
    setOpenBooking(false);
  };

  const [serviceFilter, setServiceFilter] = useState([]);

  const validateDni = async (dni) => {
    const regexDni = /^\d{8}$/;

    if (regexDni.test(dni)) {
      try {
        console.log(dni);
        const response = await axios.get(`http://localhost:3001/client/${dni}`);
        const existClient = response.data;
        console.log(response.data);

        if (existClient) {
          console.log("Cliente valido");
        } else {
          console.log("Cliente no existe");
        }
      } catch (error) {
        console.log("Error al obtener el cliente:", error);
      }
    } else {
      console.log("DNI inválido");
    }
  };
  // const date = dayjs(event.start);

  const [date, setDate] = useState(dayjs());

  const handleChangeDate = (newDate) => {
    setDate(newDate);
    setNewAppointment({
      ...newAppointment,
      date: dayjs(newDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    });
  };

  const filterProfessionalByService = (idService) => {
    // console.log(idService);
    const serviceName = services.filter(
      (service) => service.id === Number(idService)
    );
    // console.log(serviceName);
    const filter = professionals.filter((prof) => {
      return prof.Services.some(
        (service) => service.service_name === serviceName[0].service_name
      );
    });
    // console.log(filter);
    setServiceFilter(filter);
  };

  const handleSelectService = (e) => {
    const idService = e.target.value;
    // const serviceName = e.target.options[e.target.selectedIndex].text;
    // console.log(idService);
    // console.log(serviceName);
    filterProfessionalByService(idService);
    setNewAppointment({ ...newAppointment, serviceId: idService });
  };

  const handleSetTime = (e) => {
    const nameProp = e.target.name;
    const valueTime = dayjs(e.target.value, "HH:mm").format("HH:mm");

    // console.log(e.target.name);
    // console.log(e.target.value);
    setNewAppointment({ ...newAppointment, [nameProp]: valueTime });
  };

  const handleSelectProfessional = (e) => {
    const dniProf = e.target.value;

    setNewAppointment({ ...newAppointment, professionalDni: dniProf });
  };

  const handleChangeDni = (e) => {
    const dni = e.target.value;
    console.log(dni);
    validateDni(dni);
    setNewAppointment({ ...newAppointment, dni: dni });
  };

  const handleSubmit = async (e) => {
    // console.log("Voy a pagar el servicio");
    e.preventDefault();

    const response = await axios.post(
      `http://localhost:3001/appointment`,
      newAppointment
    );
    const result = response.data;
    console.log(result);
    setNewAppointment({
      date: dayjs().format("YYYY-MM-DD"),
      time: "",
      dni: "",
      // end: "",
      professionalDni: "",
      serviceId: "",
    });
    dispatch(getAppointments())
    handleClose()
    return result;
  };

  console.log("Objeto appointment", newAppointment);
  return (
    <div>
      <TriggerButton type="button" onClick={handleOpen}>
        Reservar turno
      </TriggerButton>
      <Modal
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        open={openBooking}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}>
        <ModalContent sx={{ width: 700, height: 300 }}>
          <form onSubmit={handleSubmit}>
            <div className="header">
              <h4
                align="center"
                id="keep-mounted-modal-title"
                className="modal-title">
                Reserva de turno
              </h4>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <BasicDatePicker
                date={date}
                handleChangeDate={handleChangeDate}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "2%",
                }}>
                <label htmlFor="dni">Cliente</label>
                <input
                  id="dni"
                  type="text"
                  placeholder="Dni"
                  value={newAppointment.dni}
                  onChange={handleChangeDni}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "2%",
              }}>
              <label htmlFor="service">Servicio</label>
              <select
                id="service"
                onChange={handleSelectService}
                style={{ width: "40%" }}>
                <option value="0">-- Selecciona un servicio --</option>
                {services.map((service) => {
                  return (
                    <option
                      key={service.id}
                      id={service.id}
                      name={service.service_name}
                      value={service.id}>
                      {service.service_name}
                    </option>
                  );
                })}
              </select>

              {Number(newAppointment.serviceId) !== 0 && (
                <>
                  <label htmlFor="professional">Profesional</label>
                  <select id="professional" onChange={handleSelectProfessional}>
                    <option value="">-- Selecciona un profesional --</option>
                    {serviceFilter.map((prof) => {
                      return (
                        <option key={prof.dni} id={prof.dni} value={prof.dni}>
                          {prof.name}
                        </option>
                      );
                    })}
                  </select>
                </>
              )}
            </div>

            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                gap: "5%",
              }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5%",
                  width: "fit-content",
                }}>
                <label
                  htmlFor="start"
                  style={{ marginRight: "10px", width: "fit-content" }}>
                  Hora:
                </label>
                <input
                  id="start"
                  min="08:00"
                  max="21:00"
                  value={newAppointment.start}
                  name="time"
                  type="time"
                  onChange={handleSetTime}
                  style={{ width: "80px" }}
                />
              </div>
              {/* 
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",

                width: "fit-content",
              }}>
              <label
                htmlFor="end"
                style={{ marginRight: "10px", width: "fit-content" }}>
                Hasta
              </label>
              <input
                key="end"
                min="08:00"
                max="21:00"
                value={newAppointment.end}
                name="end"
                type="time"
                onChange={handleSetTime}
                style={{ width: "80px" }}
              />
            </div> */}
            </div>

            <Divider />
            <div
              className="footer"
              align="center"
              style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                type="submit">
                Reservar
              </Button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled("div")(
  ({ theme }) => css`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `
);

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const TriggerButton = styled("button")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);

export default NewBooking;
