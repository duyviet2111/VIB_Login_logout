import { DashboardLayout } from "@/components/dashboard-layout";
import React, { useContext, useEffect, useRef } from "react";
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import {
  Container,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Divider,
  Stack,
  Table,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { rmApi } from "@/__api__/rm/rmApi";
import ManageContextProvider, { ManageContext } from "@/components/qlhs/rm/context/manage";
import PrintIcon from "@mui/icons-material/Print";
import { QrCode } from "@/components/qlhs/utils/qrcode";
import { useReactToPrint } from "react-to-print";
import { PrintRecord } from "@/components/qlhs/utils/printRecords";
import Print from "@/components/qlhs/utils/print";

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 30,
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0px 16px",
    width: "25%",
  },
}))(TableCell);

const HandlingDetails = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const [handlingDetailRecords, setHandlingDetailRecords] = React.useState([]);
  const [steps, setSteps] = React.useState([]);
  const { detailsRecord } = useContext(ManageContext);

  const fetchApi = async () => {
    try {
      const response = await rmApi.getSteps();
      if (response.status == 200) {
        setSteps(response.steps);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const componentQrCodeRef = useRef();
  const componentRecordsRef = useRef();
  const handlePrintQrCode = useReactToPrint({
    content: () => componentQrCodeRef.current,
  });
  const handlePrintRecords = useReactToPrint({
    content: () => componentRecordsRef.current,
  });

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
        mx: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid sx={{ display: "flex" }}>
          <Box width="50%">
            <Typography variant="h6" mb={1}>
              Mượn hồ sơ
            </Typography>
            <Table>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>Số HDTD</StyledTableCell>
                  <StyledTableCell>{detailsRecord.numOfHDTD}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Số HĐTD/LOS</StyledTableCell>
                  <StyledTableCell>{detailsRecord.CIF}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Họ và tên</StyledTableCell>
                  <StyledTableCell>{detailsRecord.fullname}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>CIF</StyledTableCell>
                  <StyledTableCell>{detailsRecord.reqType}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Thời gian mượn</StyledTableCell>
                  <StyledTableCell>{detailsRecord.date}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Trạng thái hồ sơ</StyledTableCell>
                  <StyledTableCell>{detailsRecord.status}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Box>
          <Box>
            <Typography variant="h6" mb={1}>
              Thông tin xử lý
            </Typography>
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps?.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent TransitionProps={{ appear: true, in: true }}>
                      <Typography>{step.description}</Typography>
                      <Typography variant="caption">{step.time}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
        </Grid>
        <Divider sx={{ my: "2rem" }} />
        <Link href="/qlhs/rm/handling">
          <Button>Trở về</Button>
        </Link>
      </Container>
      <Print selectedRecord={detailsRecord} />
    </Box>
  );
};

HandlingDetails.getLayout = (page) => (
  <ManageContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </ManageContextProvider>
);

export default HandlingDetails;
