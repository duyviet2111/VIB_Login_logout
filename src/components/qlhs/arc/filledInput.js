import React from "react";
import { Box, Typography, InputLabel, TextField, Grid, Button } from "@mui/material";
import { arcApi } from "../../../__api__/arc/Arc-api";
import { useFormikContext } from "formik";

const FilledInput = ({ setOpen, setConfirm, setError, setMessage }) => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    setValues,
    setSubmitting,
    isSubmitting,
  } = useFormikContext();

  const fetchApi = async () => {
    return await arcApi.postFinish();
  };

  const handleFinished = async () => {
    const res = await fetchApi();
    setSubmitting(true);
    // setOpen(false);
    // setConfirm(false);

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      setOpen(false);
      setConfirm(false);

      if (res.status == 200) {
        const value = values.box;
        const quantityOfRecords = values.box.listRecordId.length;
        setValues({
          ...values,
          listBox: values.listBox.concat({ ...value, quantityOfRecords, status: "Chờ phê duyệt" }),
          waittingApprove: [],
          box: { boxId: "", seal1: "", seal2: "" },
        });
        console.log("post method", values.box);
      } else {
        setError(true);
        setMessage(res.message);
      }
    }
  };

  const handleBack = () => {
    setConfirm(false);
  };

  return (
    <Box>
      <Typography mb={2} variant="h6">
        Thông tin thùng
      </Typography>
      <Grid container rowSpacing={1}>
        <Grid item sx={{ display: "flex" }}>
          <InputLabel sx={{ mr: 2, lineHeight: "40px" }}>Số thùng</InputLabel>
          <TextField
            name={`box.boxId`}
            onChange={handleChange}
            value={values.box.boxId}
            sx={{ flexGrow: 1 }}
            size="small"
            error={isSubmitting && errors.box?.boxId ? errors.box?.boxId : undefined}
            helperText={isSubmitting && errors.box?.boxId && errors.box?.boxId}
          />
        </Grid>
        <Grid item sx={{ display: "flex" }}>
          <InputLabel sx={{ mr: 2, lineHeight: "40px" }}>Số Seal 1</InputLabel>
          <TextField
            name={`box.seal1`}
            onChange={handleChange}
            value={values.box.seal1}
            sx={{ flexGrow: 1 }}
            size="small"
            error={isSubmitting && errors.box?.seal1 ? errors.box?.seal1 : undefined}
            helperText={isSubmitting && errors.box?.seal1 && errors.box?.seal1}
          />
        </Grid>
        <Grid item sx={{ display: "flex" }}>
          <InputLabel sx={{ mr: 2, lineHeight: "40px" }}>Số Seal 2</InputLabel>
          <TextField
            name={`box.seal2`}
            onChange={handleChange}
            value={values.box.seal2}
            sx={{ flexGrow: 1 }}
            size="small"
            error={isSubmitting && errors.box?.seal2 ? errors.box?.seal2 : undefined}
            helperText={isSubmitting && errors.box?.seal2 && errors.box?.seal2}
          />
        </Grid>
        <Grid item sx={{ display: "flex" }}>
          <InputLabel sx={{ mr: 2, lineHeight: "40px" }}>Số hồ sơ lưu :</InputLabel>
          <Typography sx={{ lineHeight: "40px" }}>{values.box.listRecordId.length}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
          <Button variant="contained" onClick={handleBack}>
            Trở về
          </Button>
          <Button variant="contained" onClick={handleFinished}>
            Hoàn tất
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilledInput;
