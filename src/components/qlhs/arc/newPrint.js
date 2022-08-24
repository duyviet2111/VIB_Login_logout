import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import NewData from "./newData";
import { ARCContext } from "./context/arcContext";
import date from "date-and-time";

const Print = React.forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      component="main"
      sx={{
        flexGrow: 1,
        mt: 8,
        mb: 4,
        mx: 8,
      }}
    >
      <Box sx={{ float: "right", mr: "25%" }}>
        <Typography>Số :</Typography>
        <Typography>{`Ngày : ${date.format(new Date(), "DD-MM-YYYY")}`}</Typography>
      </Box>
      <Typography variant="h4" mb={4}>
        Phiếu nhập kho
      </Typography>
      <Typography variant="overline" mb={3}>
        Thông tin nhập kho
      </Typography>
      <NewData />
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

export default Print;
