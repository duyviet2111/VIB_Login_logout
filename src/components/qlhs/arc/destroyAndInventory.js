import React, { useRef, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { Destroy } from "./destroy";
import Inventory from "./inventory";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { useFormikContext } from "formik";
import { arcApi } from "../../../__api__/arc/Arc-api";
import { ARCContext } from "@/components/qlhs/arc/context/arcContext";

const DestroyAndInventoryComp = () => {
  const [checked, setChecked] = React.useState("");
  const [confirm, setConfirm] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [rowPerPage, setRowPerPage] = React.useState(10);
  const [compare, setCompare] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const { values, setFieldValue, setValues, setSubmitting, resetForm } = useFormikContext();
  const { setIsInventory, setIsDestroy } = useContext(ARCContext);

  const handleRadioGroupChange = (e) => {
    setChecked(e.target.value);
    if (e.target.value === "Phiếu kiểm kê") {
      setIsInventory(true);
      setIsDestroy(false);
      setConfirm(false);
      resetForm();
      setOpen(false);
    }
    if (e.target.value === "Phiếu tiêu huỷ") {
      setIsInventory(false);
      setIsDestroy(true);
      resetForm();
      setOpen(false);
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const showModal = () => {
    setOpen(true);
    // setSubmitting(true);
    setConfirm(true);
  };

  const fetchCompareData = async () => {
    const filter = values.Inventory; // list boxId
    const res = await arcApi.getCompareData(filter, page);
    if (res.status === 200) {
      setCompare(res);
      setValues({
        ...values,
        confirm: true,
        continue: false,
        items: [...res.items, ...values.items],
      });
    }
  };

  const handleContinue = () => {
    fetchCompareData();
  };

  const handleChangePage = (event, value) => {
    console.log("value", value);
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h6">Kiểm kê</Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        sx={{ flexDirection: "row", justifyContent: "space-between", width: "50%" }}
        onChange={handleRadioGroupChange}
        value={checked}
      >
        <FormControlLabel value="Phiếu kiểm kê" control={<Radio />} label="Phiếu kiểm kê" />
        <FormControlLabel value="Phiếu tiêu huỷ" control={<Radio />} label="Phiếu tiêu huỷ" />
      </RadioGroup>
      {checked === "Phiếu tiêu huỷ" && (
        <Destroy setConfirm={setConfirm} confirm={confirm} ref={componentRef} />
      )}
      {checked === "Phiếu kiểm kê" && (
        <Inventory
          handleChangePage={handleChangePage}
          page={page}
          rowPerPage={rowPerPage}
          open={open}
          setOpen={setOpen}
          compare={compare}
          ref={componentRef}
        />
      )}
      {checked && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: "15px" }}>
          <Box sx={{ display: "flex" }}>
            <Link href="/qlhs/arc">
              <Button startIcon={<ArrowBackIosIcon />} variant="outlined">
                Trở về
              </Button>
            </Link>
          </Box>
          {values.confirm && (
            <Box>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="vib" onClick={handlePrint}>
                  In phiếu
                </Button>
                <Button variant="contained" color="vib" onClick={showModal} endIcon={<SendIcon />}>
                  Xác nhận
                </Button>
              </Stack>
            </Box>
          )}
          {values?.continue && (
            <Button variant="contained" color="vib" onClick={handleContinue}>
              Tiếp tục
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DestroyAndInventoryComp;
