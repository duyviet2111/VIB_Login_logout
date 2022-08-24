import { StyledTableCell, StyledTableRow } from "@/components/styles/table";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import date from "date-and-time";
import React from "react";
import { useFormikContext } from "formik";

export const InventoryPrint = React.forwardRef((props, ref) => {
  const { values } = useFormikContext();
  return (
    <Box
      ref={ref}
      sx={{
        flexGrow: 1,
        mt: 8,
        mb: 4,
        mx: 8,
      }}
      component="main"
    >
      <Box sx={{ float: "right", mr: "25%", mb: 2 }}>
        <Typography>Số :</Typography>
        <Typography>{`Ngày : ${date.format(new Date(), "DD-MM-YYYY")}`}</Typography>
      </Box>
      <Box>
        <Typography mb={2} variant="h6">
          Thông tin hồ sơ chênh lệch
        </Typography>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Phân loại kiểm kê</StyledTableCell>
              <StyledTableCell>Số HĐTD/Số bìa hồ sơ</StyledTableCell>
              <StyledTableCell>Số seal hồ sơ</StyledTableCell>
              <StyledTableCell>Thời gian lưu hô sơ</StyledTableCell>
              <StyledTableCell width="20%">CBQL hồ sơ</StyledTableCell>
              <StyledTableCell>Trạng thái hô sơ</StyledTableCell>
              <StyledTableCell>Cập nhật trạng thái</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {values?.items?.map((el, index) => {
              return (
                <StyledTableRow key={el.numOfCover}>
                  <StyledTableCell>{el.typeOfInventory}</StyledTableCell>
                  <StyledTableCell>{el.numOfCover}</StyledTableCell>
                  <StyledTableCell>{el.numOfSeal}</StyledTableCell>
                  <StyledTableCell>{el.saveTime}</StyledTableCell>
                  <StyledTableCell width="20%">{el.memberManagement}</StyledTableCell>
                  <StyledTableCell>{el.status}</StyledTableCell>
                  <StyledTableCell>{el.updateStatus.name}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 4 }}>
        <Box>
          <Typography>Cán bộ bàn giao</Typography>
          <Typography>(ký và ghi rõ họ tên)</Typography>
        </Box>
        <Box>
          <Typography>Cán bộ lưu trữ</Typography>
          <Typography>(Ký và ghi rõ họ tên)</Typography>
        </Box>
      </Box>
    </Box>
  );
});
