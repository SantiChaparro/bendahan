
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { getAppointments } from "../../redux/slices/appointments/thunks";

const GroupTable = ({ event, setEventSelected }) => {
  const { services } = useSelector((state) => state.services);
  const {professionals}=useSelector(state=>state.professionals);

  console.log(services, professionals);
  const dispatch = useDispatch();

  const deleteAppointment = async (idAppointment) => {
    const response = await axios.delete(
      `http://localhost:3001/appointment/${idAppointment}`
    );
    const result = response.data;
    console.log("Response del servidor: ", result);
    dispatch(getAppointments());
    const updateEvent = event.filter(
      (app) => app.idAppointment !== idAppointment
    );
    setEventSelected(updateEvent);
  };

  const editAppointment = (serviceName) => {
    console.log("Voy a editar un turno con el servicio: ", serviceName);

    const proffesionalsByServices= professionals.filter((prof)=>{
      return prof.Services.some((service)=> service.service_name===serviceName)
    })
console.log(proffesionalsByServices);
    return proffesionalsByServices

  };

  console.log(event);
  const app = event;
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Servicio</TableCell>
            <TableCell align="right">Id Appointment</TableCell>
            <TableCell align="right">Inicio</TableCell>
            <TableCell align="right">Fin</TableCell>
            <TableCell align="right">Profesional</TableCell>
            <TableCell align="right">Costo</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: "hidden" }}>
          {app.map((app) => (
            <TableRow key={app.idAppointment}>
              <TableCell component="th" scope="row">
                {app.serviceName}
              </TableCell>
              <TableCell align="right">{app.idAppointment}</TableCell>
              <TableCell align="right">
                {dayjs(app.start).format("HH:mm")}
              </TableCell>
              <TableCell align="right">
                {dayjs(app.end).format("HH:mm")}
              </TableCell>
              <TableCell align="right">{app.nameProfessional}</TableCell>
              <TableCell align="right">${app.cost}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => editAppointment(app.serviceName)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteAppointment(app.idAppointment)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupTable;
