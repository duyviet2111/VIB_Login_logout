import { StyledTableCell2, StyledTableRow } from "@/components/styles/table";
import {
  Box,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "&": {
    width: "50%",
  },
}));

const DestroyData = ({
  destroyData,
  getDataByCover,
  handleChangeCover,
  handleChange,
  values,
  cover,
  handleDeleteRow,
}) => {
  return (
    <>
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
            {values.destroy.records.map((el, index) => (
              <StyledTableRow key={el.numOfCover}>
                <StyledTableCell2>{el.numOfCover}</StyledTableCell2>
                <StyledTableCell2>{el.saveTime}</StyledTableCell2>
                <StyledTableCell2>{el.numOfSeal}</StyledTableCell2>
                <StyledTableCell2>{el.status}</StyledTableCell2>
                <StyledTableCell2>{el.memberManagement}</StyledTableCell2>
                <StyledTableCell2 sx={{ position: "absolute", right: "5px" }}>
                  <IconButton onClick={() => handleDeleteRow(index)}>
                    <CloseIcon />
                  </IconButton>
                </StyledTableCell2>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell2>
                <TextField
                  onChange={handleChangeCover}
                  onKeyDown={getDataByCover}
                  variant="standard"
                  value={cover}
                />
              </StyledTableCell2>
              <StyledTableCell2></StyledTableCell2>
              <StyledTableCell2></StyledTableCell2>
              <StyledTableCell2></StyledTableCell2>
              <StyledTableCell2></StyledTableCell2>
            </StyledTableRow>
          </TableBody>
        </Table>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mt: 2 }}>
        <Pagination
          count={destroyData.totalPage}
          page={destroyData.currentPage}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default DestroyData;
