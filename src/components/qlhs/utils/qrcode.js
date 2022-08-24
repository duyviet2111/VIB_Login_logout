import QRCode from "qrcode";
import React, { useEffect } from "react";
import { Box, TableBody, Typography, Table } from "@mui/material";
import { rmApi } from "@/__api__/rm/rmApi";
import { StyledTableCell2, StyledTableRow } from "@/components/styles/table";

export const QrCode = React.forwardRef((props, ref) => {
  const [src, setSrc] = React.useState("");
  const [cover, setCover] = React.useState("");
  const { selectedRecord } = props;
  // const [numOfCover, setNumOfCover] = React.useState("");

  console.log("selectedRecord", selectedRecord);

  const fetchApi = async () => {
    const res = await rmApi.getPrintCoverData(selectedRecord);
    const response = await rmApi.getNumberOfCover(selectedRecord);
    if (res.status == 200) {
      setCover(res.value);
    }
    if (response.status == 200) {
      const numOfCover = response.value.numOfCover;
      QRCode.toDataURL(JSON.stringify(numOfCover)).then(setSrc);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
        mx: 3,
      }}
      ref={ref}
    >
      <img src={src} />
      <Typography sx={{ margin: "auto", mt: 3, mb: 5, textAlign: "center" }} variant="h4">
        HỒ SƠ VAY VỐN, BẢO LÃNH
      </Typography>
      <Table sx={{ mx: 5 }}>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell2>{cover.name}</StyledTableCell2>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell2>{cover.cif}</StyledTableCell2>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell2>{cover.hdtd}</StyledTableCell2>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell2>{cover.loan}</StyledTableCell2>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell2>{cover.seal1}</StyledTableCell2>
          </StyledTableRow>
        </TableBody>
      </Table>
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
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 11 }}>
        <Box>
          <Typography>Ngày .... tháng ... năm ...</Typography>
        </Box>
        <Box>
          <Typography>Ngày .... tháng ... năm ...</Typography>
        </Box>
      </Box>
    </Box>
  );
});
