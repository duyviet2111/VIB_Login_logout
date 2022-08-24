import { PrintRecord } from "@/components/qlhs/utils/printRecords";
import { QrCode } from "@/components/qlhs/utils/qrcode";
import PrintIcon from "@mui/icons-material/Print";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React, { useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { BorrowAdditionalContext } from "@/components/eadmin/policy/context/borrowAdditional";

const Print = ({ selectedRecord, rmCard }) => {
  const componentQrCodeRef = useRef();
  const componentRecordsRef = useRef();
  const handlePrintQrCode = useReactToPrint({
    content: () => componentQrCodeRef.current,
  });
  const handlePrintRecords = useReactToPrint({
    content: () => componentRecordsRef.current,
  });

  return (
    <>
      <Stack spacing={2} sx={{ float: "right", width: "220px" }}>
        {!rmCard && (
          <Button
            sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
            onClick={handlePrintQrCode}
          >
            <Typography>In bìa hồ sơ</Typography>
            <PrintIcon />
          </Button>
        )}
        <Button
          onClick={handlePrintRecords}
          sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
        >
          <Typography>In danh sách hồ sơ</Typography>
          <PrintIcon />
        </Button>
      </Stack>
      <Box sx={{ display: "none" }}>
        <QrCode selectedRecord={selectedRecord} ref={componentQrCodeRef} />
        <PrintRecord selectedRecord={selectedRecord} ref={componentRecordsRef} />
      </Box>
    </>
  );
};

export default Print;
