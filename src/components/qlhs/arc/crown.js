import { DashboardLayout } from "@/components/dashboard-layout";
import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  Checkbox,
  TableBody,
  TextField,
  Modal,
  Grid,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { StyledTableRow, StyledTableCell } from "@/components/styles/table";
import FoldBox from "./foldBox";
import { arcApi } from "../../../__api__/arc/Arc-api";
import FilledInput from "./filledInput";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import { boxStatus } from "../../../utils/const";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import ShowErrorCode from "../utils/showError";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "900px",
  p: 4,
};

export const CrownInitialValue = {
  waittingCrown: [],
  waittingApprove: [],
  boxWaitingApprove: [],
  box: {
    boxId: "",
    seal1: "",
    seal2: "",
  },
};

export const CrownValidationSchema = Yup.object({
  box: Yup.object({
    boxId: Yup.number().required("required"),
    seal1: Yup.number().required("required"),
    seal2: Yup.number().required("required"),
  }),
});

const Crown = () => {
  const [open, setOpen] = React.useState(false);
  const [crown, setCrown] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const [confirm, setConfirm] = React.useState(false);
  const handleClose = () => setOpen(false);
  const showModal = () => setOpen(true);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const { values, touched, errors, setFieldValue, handleChange, setValues } = useFormikContext();

  const fetchApi = async () => {
    return await arcApi.getWaitingCrownStore();
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchApi();
      // setData(res);
      setFieldValue("listBox", res);
    };
    fetch();
  }, [crown]);

  const handleCheck = (value) => {
    const currentIndex = values.waittingCrown?.findIndex(
      (c) => c.boxId === value.boxId && c.seal1 === value.seal1 && c.seal2 === value.seal2
    );
    const newChecked = [...values.waittingCrown];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setFieldValue("waittingCrown", newChecked);
  };

  const handleChangeAll = (e) => {
    const check = e.target.checked;
    if (check) {
      const value = values.listBox.filter((el) => el.status === boxStatus.waitingCrown);
      setFieldValue("waittingCrown", value);
    }
    if (!check) setFieldValue("waittingCrown", []);
  };

  const handleSubmit = async () => {
    const value = values.waittingCrown.map((el) => ({ BoxId: el.boxId }));
    setCrown(!crown);
    console.log("submit data", value);
  };

  const handleDeleteRow = (rowIndex) => {
    setFieldValue(
      "listBox",
      values.listBox.filter((_, index) => index !== rowIndex)
    );
  };

  return (
    <Box>
      <Typography mb={2} variant="h6">
        Phiểu chuyển crown
      </Typography>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <Checkbox onChange={handleChangeAll} />
            </StyledTableCell>
            <StyledTableCell>Mã thùng</StyledTableCell>
            <StyledTableCell>Số Seal 1</StyledTableCell>
            <StyledTableCell>Số Seal 2</StyledTableCell>
            <StyledTableCell>Số lượng bìa hồ sơ</StyledTableCell>
            <StyledTableCell>Trạng thái</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {values?.listBox?.map((el, index) => {
            const rowChecked =
              values.waittingCrown?.findIndex(
                (c) => c.boxId === el.boxId && c.seal1 === el.seal1 && c.seal2 === el.seal2
              ) > -1;

            return (
              <StyledTableRow sx={{ position: "relative" }} key={el.boxId}>
                <StyledTableCell>
                  <Checkbox
                    disabled={el.status === boxStatus.waitingApprove ? true : false}
                    checked={rowChecked}
                    tabIndex={-1}
                    onClick={() => handleCheck(el)}
                  />
                </StyledTableCell>
                <StyledTableCell>{el.boxId}</StyledTableCell>
                <StyledTableCell>{el.seal1}</StyledTableCell>
                <StyledTableCell>{el.seal2}</StyledTableCell>
                <StyledTableCell>{el.quantityOfRecords}</StyledTableCell>
                <StyledTableCell>{el.status}</StyledTableCell>
                {el.status === boxStatus.waitingApprove && (
                  <StyledTableCell sx={{ position: "absolute", right: "-55px" }}>
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <CloseIcon />
                    </IconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            );
          })}
          <StyledTableRow>
            <StyledTableCell>
              <Checkbox />
            </StyledTableCell>
            <StyledTableCell>
              <TextField
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                onClick={showModal}
              />
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid sx={confirm ? { ...style, width: "403px" } : style}>
          {confirm ? (
            <FilledInput
              setError={setError}
              setMessage={setMessage}
              setConfirm={setConfirm}
              setOpen={setOpen}
            />
          ) : (
            <FoldBox setConfirm={setConfirm} />
          )}
        </Grid>
      </Modal>
      <Divider sx={{ my: 2 }} />
      <Grid sx={{ justifyContent: "space-between", display: "flex" }}>
        <Link href="/qlhs/arc" passHref>
          <Button variant="outlined">Trở về</Button>
        </Link>
        <Button
          variant="contained"
          color="vib"
          disabled={values.waittingCrown.length ? false : true}
          onClick={handleSubmit}
        >
          Chuyển kho Crown
        </Button>
      </Grid>
      {error && <ShowErrorCode open={error} setOpen={setError} message={message} />}
    </Box>
  );
};

Crown.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Crown;
