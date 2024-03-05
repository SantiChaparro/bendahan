// import * as React from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { styled, css, height } from "@mui/system";
// import { Modal as BaseModal } from "@mui/base/Modal";
// import dayjs from "dayjs";
// import Divider from "@mui/material/Divider";
// import Button from "@mui/material/Button";
// import TableGroupAppointment from "./TableGroupAppointment";

// export default function DetailAppointment({ openModal, closeModal, event }) {
//   console.log(event);
//   const date = dayjs(event.start);
//   const start = dayjs(event.start);
//   const end = dayjs(event.end);
//   console.log(end);
//   const alt=400
//   return (
//     <div>
//       <Modal
//         aria-labelledby="keep-mounted-modal-title"
//         aria-describedby="keep-mounted-modal-description"
//         open={openModal}
//         onClose={closeModal}
//         slots={{ backdrop: StyledBackdrop }}
//         keepMounted
//       >
//         <ModalContent sx={{ width: 600, height: {alt} }}>
//           <div
//             style={{
//               border: "solid red 2px",
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//               height: "15%",
//             }}
//           >
//             <div
//               style={{
//                 border: "solid green 2px",
//                 display: "flex",
//                 flexDirection: "row",
//                 width: "100%",
//               }}
//             >
//               <h4 id="keep-mounted-modal-title" className="modal-title">
//                 {event.name}
//               </h4>
//             </div>
//             <div
//               style={{
//                 border: "solid blue 2px",
//                 display: "flex",
//                 flexDirection: "row",
//                 width: "fit-content",
//               }}
//             >
//               <h4 id="keep-mounted-modal-title" className="modal-title">
//                 {date.format("DD/MM/YYYY")}
//               </h4>
//             </div>
//           </div>
//           <Divider />
         
//             <TableGroupAppointment style={{height:'50%'}} />
          
//           <Divider />
//           <div
//             style={{
//               border: "solid 2px orange",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "flex-end",
//               marginBottom: "5px",
//               height: "15%",
//             }}
//           >
//             <div
//               style={{
//                 border: "solid 2px pink",
//                 width: "fit-content",
//                 height: "fit-content",
//                 marginRight: "10px",
//               }}
//             ></div>
//             <div
//               style={{
//                 border: "solid 2px cyan",
//                 width: "fit-content",
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: "5px",
//               }}
//             >
//               <Button
//                 variant="contained"
//                 color="success"
//                 style={{ width: "fit-content" }}
//                 size="small"
//               >
//                 Pagar
//               </Button>
//               <Button variant="contained" color="error" size="small">
//                 Cancelar
//               </Button>
//             </div>
//           </div>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

// const Backdrop = React.forwardRef((props, ref) => {
//   const { open, className, ...other } = props;
//   return (
//     <div
//       className={clsx({ "base-Backdrop-open": open }, className)}
//       ref={ref}
//       {...other}
//     />
//   );
// });

// Backdrop.propTypes = {
//   className: PropTypes.string.isRequired,
//   open: PropTypes.bool,
// };

// const blue = {
//   200: "#99CCFF",
//   300: "#66B2FF",
//   400: "#3399FF",
//   500: "#007FFF",
//   600: "#0072E5",
//   700: "#0066CC",
// };

// const grey = {
//   50: "#F3F6F9",
//   100: "#E5EAF2",
//   200: "#DAE2ED",
//   300: "#C7D0DD",
//   400: "#B0B8C4",
//   500: "#9DA8B7",
//   600: "#6B7A90",
//   700: "#434D5B",
//   800: "#303740",
//   900: "#1C2025",
// };

// const Modal = styled(BaseModal)(
//   `
//   position: fixed;
//   z-index: 1300;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   left: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &.base-Modal-hidden {
//     visibility: hidden;
//   }
// `
// );

// const StyledBackdrop = styled(Backdrop)`
//   z-index: -1;
//   position: fixed;
//   inset: 0;
//   background-color: rgb(0 0 0 / 0.5);
//   -webkit-tap-highlight-color: transparent;
// `;

// const ModalContent = styled("div")(
//   ({ theme }) => css`
//     font-family: "IBM Plex Sans", sans-serif;
//     font-weight: 500;
//     text-align: start;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     overflow: hidden;
//     background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//     border-radius: 8px;
//     border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//     box-shadow: 0 4px 12px
//       ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
//     padding: 24px;
//     color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

//     & .modal-title {
//       margin: 0;
//       line-height: 1.5rem;
//       margin-bottom: 8px;
//     }

//     & .modal-description {
//       margin: 0;
//       line-height: 1.5rem;
//       font-weight: 400;
//       color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
//       margin-bottom: 4px;
//     }
//   `
// );

// const TriggerButton = styled("button")(
//   ({ theme }) => css`
//     font-family: "IBM Plex Sans", sans-serif;
//     font-weight: 600;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     padding: 8px 16px;
//     border-radius: 8px;
//     transition: all 150ms ease;
//     cursor: pointer;
//     background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//     border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//     color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
//     box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

//     &:hover {
//       background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
//       border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
//     }

//     &:active {
//       background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
//     }

//     &:focus-visible {
//       box-shadow: 0 0 0 4px
//         ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
//       outline: none;
//     }
//   `
// );


import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import GroupTable from "./GroupTable";


export default function DetailAppointment({ openModal, closeModal, event }) {
  const date = dayjs(event.start);
  
  console.log(event);

  return (
    <Modal
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      open={openModal}
      onClose={closeModal}
      slots={{ backdrop: StyledBackdrop }}
      keepMounted
    >
      <ModalContent sx={{ width: 600, height: 400 }}>
        <div className="header">
          <h4 id="keep-mounted-modal-title" className="modal-title">
            {event[0].name}
          </h4>
          <h4 id="keep-mounted-modal-title" className="modal-title">
            {date.format("DD/MM/YYYY")}
          </h4>
        </div>
        <Divider />
       
          <GroupTable style={{height:'100%'}} event={event}/>
      

        <Divider />
        <div className="footer">
          <Button variant="contained" color="success" size="small">
            Pagar
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}

DetailAppointment.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
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

    // .content {
    //   flex-grow: 1; /* Para expandir este contenedor y que ocupe todo el espacio disponible */
    //   // overflow-y: auto; /* Para agregar barras de desplazamiento vertical si el contenido excede el tamaño del contenedor */
    //   height: 40%; /* 60% de la altura del modal */
    // }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 5px;
      height: 20%; /* 20% de la altura del modal */
    }

    .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }
  `
);
