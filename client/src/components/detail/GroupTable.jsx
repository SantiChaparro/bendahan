import * as React from "react";
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


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const deleteAppointment = () => {
  console.log("Voy a borrar un turno");
};

const editAppointment = () => {
  console.log("Voy a editar un turno");
};

export default function GroupTable({event}) {
  console.log(event);
  const app= event
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Servicio</TableCell>
            <TableCell align="right">Inicio</TableCell>
            <TableCell align="right">Fin</TableCell>
            <TableCell align="right">Profesional</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: "hidden" }}>
          {app.map((app) => (
            <TableRow key={app.id}>
              <TableCell component="th" scope="row">
                {app.title}
              </TableCell>
              <TableCell align="right">{ (dayjs(app.start)).format('HH:mm')}</TableCell>
              <TableCell align="right">{(dayjs(app.end)).format('HH:mm')}</TableCell>
              <TableCell align="right">{app.resource}</TableCell>
              <TableCell align="right">
                <IconButton onClick={editAppointment}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={deleteAppointment}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
