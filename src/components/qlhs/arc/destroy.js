import { Box, Button, Modal, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormikContext } from "formik";
import React from "react";
import * as Yup from "yup";
import { arcApi } from "../../../__api__/arc/Arc-api";
import ShowErrorCode from "../utils/showError";
import DestroyData from "./destroyData";
import { DestroyPrint } from "./destroyPrint";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "&": {
    width: "50%",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const DestroyInitialValue = {
  destroy: {
    deliveryRecords: "",
    numOfDestroy: "",
    records: [],
  },
};

export const DestroySchema = Yup.object({
  destroy: Yup.object({
    deliveryRecords: Yup.string().required("required"),
    numOfDestroy: Yup.string().required("required"),
  }),
});

export const Destroy = React.forwardRef((props, ref) => {
  const [destroyData, setDestroyData] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [cover, setCover] = React.useState("");
  const [record, setRecord] = React.useState("");
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [infor, setInfor] = React.useState(false);
  const handleChangePage = (event, value) => {
    setPage(value);
    fetchApi(cover, value);
  };
  const handleClose = () => props.setConfirm(false);

  const {
    values,
    touched,
    errors,
    setFieldValue,
    setSubmitting,
    isSubmitting,
    resetForm,
    setValues,
    handleChange,
  } = useFormikContext();

  const handleSearch = (e) => {
    if (e.key == "Enter") {
      setValues({
        confirm: true,
        ...values,
        destroy: { deliveryRecords: "", numOfDestroy: values.destroy.numOfDestroy, records: [] },
      });
      setInfor(true);
    }
  };

  const handleChangeTextField = (e) => {
    setValue(e.target.value);
  };

  const handleChangeCover = (e) => {
    setCover(e.target.value);
  };

  const fetchConfirmCoverApi = async () => {
    const res = await arcApi.getConfirmCoverAtDestroy(cover);
    if (res.status == 200) {
      setFieldValue("destroy.records", values.destroy.records.concat(res.value));
    } else {
      setError(true);
      setOpen(true);
      setMessage(res.message);
    }
  };

  const getDataByCover = async (e) => {
    if (e.key === "Enter") {
      setCover("");
      fetchConfirmCoverApi();
    }
  };

  const handleFinished = () => {
    setSubmitting(true);
    if (!errors.destroy) {
      props.setConfirm(false);
      setSubmitting(false);
    }
    console.log("send data to BE", values.destroy);
  };

  const handleChangeNumOfRecord = (e) => {
    setRecord(e.target.value);
  };

  const handleDeleteRow = (rowIndex) => {
    setFieldValue(
      "destroy.records",
      values.destroy.records.filter((_, index) => index !== rowIndex)
    );
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <StyledTextField
            name="destroy.numOfDestroy"
            value={values.destroy.numOfDestroy}
            onChange={handleChange}
            label="Số QĐ tiêu huỷ"
            onKeyDown={handleSearch}
          />
          {/* <Button sx={{ ml: 2 }} variant="contained" onClick={handleSearch}>
            Tìm kiếm
          </Button> */}
        </Box>
        {infor ? (
          <DestroyData
            handleChangeCover={handleChangeCover}
            getDataByCover={getDataByCover}
            destroyData={destroyData}
            handleChange={handleChangePage}
            values={values}
            cover={cover}
            handleDeleteRow={handleDeleteRow}
          />
        ) : (
          ""
        )}
        <Box sx={{ display: "none" }}>
          <DestroyPrint destroyData={destroyData} ref={ref} />
        </Box>
        <Modal
          open={props.confirm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              name="destroy.deliveryRecords"
              onChange={handleChange}
              label="Số biên bản bàn giao"
              fullWidth
              error={isSubmitting && errors.destroy && errors.destroy.deliveryRecords}
              helperText={isSubmitting && errors.destroy && errors.destroy.deliveryRecords}
            />
            <Button sx={{ mt: 2, float: "right" }} variant="contained" onClick={handleFinished}>
              Tiếp tục
            </Button>
          </Box>
        </Modal>
      </Box>
      {error && <ShowErrorCode open={open} setOpen={setOpen} message={message} />}
    </>
  );
});
