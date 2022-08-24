import React, { useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  TextField,
  Button,
  Divider,
  Pagination,
  Stack,
  Modal,
} from "@mui/material";
import Head from "next/head";
import { withStyles } from "@mui/styles";
import { useFormikContext } from "formik";
import { ARCContext } from "./context/arcContext";
import { useReactToPrint } from "react-to-print";
import Print from "./newPrint";
import NewData from "./newData";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export const newInitialValues = {
  printData: [{ numOfHĐTD: "", statusOfRecord: "", numOfSeal: "", memberManageRecord: "" }],
  store: [],
};

const New = React.forwardRef((props, ref) => {
  const [page, setPage] = React.useState(1);
  const [seal, setSeal] = React.useState("");
  const { showModal, setShowModal, save } = React.useContext(ARCContext);
  const handleClose = () => setShowModal(false);

  const { values, touched, errors, setFieldValue, handleChange, setValues } = useFormikContext();

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeNumSeal = (e) => {
    setSeal(e.target.value);
  };

  const handleCreateSeal = () => {
    values.printData[values.printData.length - 1].numOfSeal = seal;
    setValues({
      ...values,
      printData: values.printData.concat({
        numOfHĐTD: "",
        statusOfRecord: "",
        numOfSeal: "",
        memberManageRecord: "",
      }),
    });
    setShowModal(false);
  };

  return (
    <Box>
      <Box sx={{ display: "none" }}>
        <Print ref={ref} />
      </Box>
      <Typography mb={2} variant="h6">
        Phiếu nhập kho
      </Typography>
      <NewData page={page} setShowModal={setShowModal} />
      <Divider sx={{ my: "2rem" }} />
      {/* <Stack spacing={2}>
        <Pagination
          count={Math.ceil(values.printData.length / 10)}
          page={page}
          onChange={handleChangePage}
        />
      </Stack> */}
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {save ? (
            <Box sx={{ display: "flex" }}>
              <CheckCircleOutlineIcon sx={{ mr: 2 }} color="primary" />
              <Typography>Lưu kho thành công</Typography>
            </Box>
          ) : (
            <>
              {" "}
              <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                Nhập số seal
              </Typography>
              <TextField onChange={handleChangeNumSeal} fullWidth label="Nhập số seal" />
              <Button variant="contained" sx={{ float: "right", mt: 1 }} onClick={handleCreateSeal}>
                OK
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
});

New.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default New;
