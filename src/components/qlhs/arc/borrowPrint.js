import React from "react";
import BorrowData from "./borrowData";
import { listData } from "@/mocks/arc/arcBorrow";
import { Box, Typography } from "@mui/material";
import date from "date-and-time";

const BorrowPrint = React.forwardRef((props, ref) => {
  return (
    <Box ref={ref} sx={{ my: 5, mx: 4 }}>
      <Box sx={{ float: "right", mr: "25%" }}>
        <Typography>Số :</Typography>
        <Typography>{`Ngày : ${date.format(new Date(), "DD-MM-YYYY")}`}</Typography>
      </Box>
      <Typography variant="h4" mb={4}>
        Phiếu nhập kho
      </Typography>
      <Typography variant="overline">Thông tin nhập kho</Typography>
      <BorrowData
        print={props.print}
        data={props.data}
        checked={props.checked}
        setChecked={props.setChecked}
      />
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

export default BorrowPrint;
