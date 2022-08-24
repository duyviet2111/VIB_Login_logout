import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";

const initialPerson = {
  id: 15,
  place: "north",
  step_name: "Khởi tạo",
  name: "Nhữ Tuấn Anh | BTS-CTS",
  time: undefined,
  action: undefined,
  note: undefined,
};

const writer = [
  { id: 22, place: "north", step_name: "Văn thư", name: "Hoàng Thị Kim Thanh | ESC-ADM_North" },
  { id: 23, place: "north", step_name: "Văn thư", name: "Tạ Thị Cẩm Vân | ESC-ADM_North" },
  { id: 34, place: "north", step_name: "Văn thư", name: "Tạ Thị Cẩm Vân2 | ESC-ADM_North" },
  { id: 45, place: "souths", step_name: "Văn thư", name: "Tạ Thị Cẩm Vân3 | ESC-ADM_North" },
];

const filterWriter = writer.filter((member) => {
  return member.place == initialPerson.place;
});
filterWriter.unshift(initialPerson);

const ConfirmProcess = () => {
  return (
    <Box
      sx={{
        mt: "10px",
        paddingBottom: "10px",
      }}
    >
      <Typography align="left" variant="h6" className="step4-typography">
        Quy trình phê duyệt
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bước</TableCell>
            <TableCell>Người xử lý</TableCell>
            <TableCell>Thời gian</TableCell>
            <TableCell>Hành động</TableCell>
            <TableCell>Ghi chú</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterWriter.map((process) => (
            <TableRow hover key={process.id}>
              <TableCell width="250px">{process.step_name}</TableCell>
              <TableCell width="500px">{process.name}</TableCell>
              <TableCell>{process?.time}</TableCell>
              <TableCell>{process?.action}</TableCell>
              <TableCell>{process?.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ConfirmProcess;
