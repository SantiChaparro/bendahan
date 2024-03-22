import { useEffect, useState } from "react";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import GroupTable from "./GroupTable";

const DetailAppointment = ({ openModal, closeModal, event,setEventSelected }) => {
  const date = dayjs(event.start);

  const [totalService, setTotalService] = useState(0);

  useEffect(() => {
    if (event.length > 0) {
      calcCost(event);
    }
  }, [event]);

  console.log(event);

  const calcCost = (event) => {
    let totalAmount = 0;

    event.forEach((element) => {
      totalAmount += element.cost;
    });
    setTotalService(totalAmount);
  };

  return (
    <Modal
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      open={openModal}
      onClose={closeModal}
      slots={{ backdrop: StyledBackdrop }}
      keepMounted>
      <ModalContent sx={{ width: 700, height: 400 }}>
        <div className="header">
          <h4 id="keep-mounted-modal-title" className="modal-title">
            {event[0].nameClient}
          </h4>
          <h4 id="keep-mounted-modal-title" className="modal-title">
            {date.format("DD/MM/YYYY")}
          </h4>
        </div>
        <Divider />

        <GroupTable
          className="content"
          style={{ height: "100%" }}
          event={event}
          setEventSelected={setEventSelected}
        />

        <Divider />
        <div className="footer">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              marginRight: "10%",
              alignItems: "center",
            }}>
            <label style={{ fontWeight: "bold" }}>Total:</label>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              $ {totalService}
            </p>
          </div>
          <Button variant="contained" color="success" size="small">
            Pagar
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

const Modal = styled(BaseModal)(
  ({ theme }) => css`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &.base-Modal-hidden {
      visibility: hidden;
    }
  `
);

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
    background-color: ${theme.palette.mode === "dark" ? "#1C2025" : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? "#434D5B" : "#E5EAF2"};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? "#F3F6F9" : "#434D5B"};

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20%; /* 20% de la altura del modal */
    }

    .content {
      // flex-grow: 1; /* Para expandir este contenedor y que ocupe todo el espacio disponible */
      // overflow-y: auto; /* Para agregar barras de desplazamiento vertical si el contenido excede el tamaño del contenedor */
      height: 60%; /* 60% de la altura del modal */
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 5px;
      height: 20%; /* 20% de la altura del modal */
    }

    .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }
  `
);

export default DetailAppointment;
