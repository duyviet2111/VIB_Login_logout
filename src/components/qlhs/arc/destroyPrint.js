import { StyledTableCell, StyledTableRow } from "@/components/styles/table";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import date from "date-and-time";
import React from "react";

export const DestroyPrint = React.forwardRef((props, ref) => {
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
          Thông tin hồ sơ bàn giao để tiêu huỷ
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Số HĐTD/Số bìa hồ sơ</TableCell>
              <TableCell>Thời gian lưu trữ</TableCell>
              <TableCell>Số Seal hồ sơ</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>CBLT hồ sơ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.destroyData.items?.map((el, index) => (
              <StyledTableRow key={el.numOfCover}>
                <StyledTableCell>{el.numOfCover}</StyledTableCell>
                <StyledTableCell>{el.saveTime}</StyledTableCell>
                <StyledTableCell>{el.numOfSeal}</StyledTableCell>
                <StyledTableCell>{el.status}</StyledTableCell>
                <StyledTableCell>{el.memberManagement}</StyledTableCell>
              </StyledTableRow>
            ))}
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
