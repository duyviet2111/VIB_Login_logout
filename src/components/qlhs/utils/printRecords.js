import { Box, TableHead, TableRow, Typography, Table, TableCell, TableBody } from "@mui/material";
import React, { useEffect } from "react";
import { rmApi } from "@/__api__/rm/rmApi";
import { StyledTableCell2, StyledTableRow } from "@/components/styles/table";

export const PrintRecord = React.forwardRef((props, ref) => {
  const [data, setData] = React.useState([]);
  const { selectedRecord } = props;
  const fetchApi = async () => {
    const res = await rmApi.getPrintRecord(selectedRecord);
    if (res.status == 200) {
      setData(res.items);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Box
      ref={ref}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        mx: 4,
      }}
    >
      <Typography mb={4} variant="h4" sx={{ textAlign: "center" }}>
        DANH SÁCH LƯU TRỮ HỒ SƠ VAY VỐN
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nhóm hồ sơ</TableCell>
            <TableCell>Chi tiết quy định sản phẩm</TableCell>
            <TableCell>Số trang</TableCell>
            <TableCell>Bản gốc (O)/Bản sao (C)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((el) => (
            <StyledTableRow key={el.id}>
              <StyledTableCell2>{el.groupRecord}</StyledTableCell2>
              <StyledTableCell2>{el.ruleOfProduct}</StyledTableCell2>
              <StyledTableCell2>{el.numOfPage}</StyledTableCell2>
              <StyledTableCell2>{el.form}</StyledTableCell2>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
});
