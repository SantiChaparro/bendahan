import * as React from "react";
import PropTypes from "prop-types";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useState } from "react";
import clsx from "clsx";
import BasicDatePicker from "../calendar/DatePicker";

const NewBooking = () => {
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    start: "",
    end: "",
    service: 0,
    professional: "",
  });

  const [serviceFilter, setServiceFilter] = useState([]);

  const professionals = [
    {
      dni: 12345678,
      name: "Carlos Sánchez",
      phone: "1234567890",
      mail: "carlos.sanchez@example.com",
      services: [1, 3, 5], // IDs de servicios: Faciales personalizados, Depilación, Tratamientos de rejuvenecimiento de la piel
    },
    {
      dni: 23456789,
      name: "María Rodríguez",
      phone: "9876543210",
      mail: "maria.rodriguez@example.com",
      services: [2, 4, 6], // IDs de servicios: Masajes corporales, Manicura y pedicura, Maquillaje profesional
    },
    {
      dni: 34567890,
      name: "Juan Martínez",
      phone: "5558889999",
      mail: "juan.martinez@example.com",
      services: [7, 8, 10], // IDs de servicios: Extensiones de pestañas, Tratamientos corporales, Tratamientos de spa
    },
    {
      dni: 45678901,
      name: "Laura Gómez",
      phone: "7773331111",
      mail: "laura.gomez@example.com",
      services: [1, 4, 7], // IDs de servicios: Faciales personalizados, Manicura y pedicura, Extensiones de pestañas
    },
    {
      dni: 56789012,
      name: "Pedro López",
      phone: "9990001111",
      mail: "pedro.lopez@example.com",
      services: [2, 5, 8], // IDs de servicios: Masajes corporales, Tratamientos de rejuvenecimiento de la piel, Tratamientos corporales
    },
    {
      dni: 67890123,
      name: "Ana Díaz",
      phone: "4443332222",
      mail: "ana.diaz@example.com",
      services: [3, 6, 9], // IDs de servicios: Depilación, Maquillaje profesional, Bronceado sin sol
    },
    {
      dni: 78901234,
      name: "Luis Pérez",
      phone: "1112223333",
      mail: "luis.perez@example.com",
      services: [4, 7, 10], // IDs de servicios: Manicura y pedicura, Extensiones de pestañas, Tratamientos de spa
    },
    {
      dni: 89012345,
      name: "Lucía Castro",
      phone: "6667778888",
      mail: "lucia.castro@example.com",
      services: [1, 5, 9], // IDs de servicios: Faciales personalizados, Tratamientos de rejuvenecimiento de la piel, Bronceado sin sol
    },
    {
      dni: 98765432,
      name: "Marta Ruiz",
      phone: "2224446666",
      mail: "marta.ruiz@example.com",
      services: [2, 6, 10], // IDs de servicios: Masajes corporales, Maquillaje profesional, Tratamientos de spa
    },
    {
      dni: 87654321,
      name: "Javier González",
      phone: "8889990000",
      mail: "javier.gonzalez@example.com",
      services: [3, 7, 9], // IDs de servicios: Depilación, Extensiones de pestañas, Bronceado sin sol
    },
  ];

  const services = [
    { id: 1, name: "Faciales personalizados" },
    { id: 2, name: "Masajes corporales" },
    { id: 3, name: "Depilación" },
    { id: 4, name: "Manicura y pedicura" },
    { id: 5, name: "Tratamientos de rejuvenecimiento de la piel" },
    { id: 6, name: "Maquillaje profesional" },
    { id: 7, name: "Extensiones de pestañas" },
    { id: 8, name: "Tratamientos corporales" },
    { id: 9, name: "Bronceado sin sol" },
    { id: 10, name: "Tratamientos de spa" },
  ];

  // const date = dayjs(event.start);

  const [date, setDate] = useState(dayjs());

  const handleChangeDate = (newDate) => {
    setDate(newDate);
    setNewAppointment({
      ...newAppointment,
      date: dayjs(newDate, "DD-MM-YYYY").format("DD-MM-YYYY"),
    });
  };

  const filterProfessionalByService = (idService) => {
    console.log(idService);
    const filter = professionals.filter((prof) =>
      prof.services.includes(Number(idService))
    );
    console.log(filter);
    setServiceFilter(filter);
  };

  const handleSelectService = (e) => {
    const idService = e.target.value;
    console.log(idService);

    filterProfessionalByService(idService);
    setNewAppointment({ ...newAppointment, service: idService });
  };

  const handleSetTime = (e) => {
    const nameProp = e.target.name;
    const valueTime = dayjs(e.target.value, "HH:mm").format("HH:mm");

    console.log(e.target.name);
    console.log(e.target.value);
    setNewAppointment({ ...newAppointment, [nameProp]: valueTime });
  };

  const handleSelectProfessional = (e) => {
    const dniProf = e.target.value;

    setNewAppointment({ ...newAppointment, professional: dniProf });
  };

  const handleSubmit = () => {
    console.log("Voy a pagar el servicio");
    setNewAppointment({
      date: "",
      start: "",
      end: "",
      service: 0,
      professional: "",
    });
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}>
        <ModalContent sx={{ width: 700, height: 300 }}>
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
            <BasicDatePicker date={date} handleChangeDate={handleChangeDate} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "2%",
              }}>
              <label htmlFor="Dni">Cliente</label>
              <input
                id="Dni"
                type="text"
                placeholder="Dni"
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
                  <option id={service.id} value={service.id}>
                    {service.name}
                  </option>
                );
              })}
            </select>

            {Number(newAppointment.service) !== 0 && (
              <>
                <label htmlFor="professional">Profesional</label>
                <select id="professional" onChange={handleSelectProfessional}>
                  <option value="" selected>
                    -- Selecciona un profesional --
                  </option>
                  {serviceFilter.map((prof) => {
                    return (
                      <option id={prof.dni} value={prof.dni}>
                        {prof.name}
                      </option>
                    );
                  })}
                </select>{" "}
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
                Desde
              </label>
              <input
                key="start"
                min="08:00"
                max="21:00"
                value={newAppointment.start}
                name="start"
                type="time"
                onChange={handleSetTime}
                style={{ width: "80px" }}
              />
            </div>

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
            </div>
          </div>

          <Divider />
          <div className="footer" align="center" style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleSubmit}>
              Reservar
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

NewBooking.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
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

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

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
