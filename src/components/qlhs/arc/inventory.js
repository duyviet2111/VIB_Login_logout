import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Autocomplete,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Modal,
  Divider,
  Pagination,
  Stack,
} from "@mui/material";
import { arcApi } from "../../../__api__/arc/Arc-api";
import { useFormikContext } from "formik";
import { StyledTableCell, StyledTableRow } from "@/components/styles/table";
import * as Yup from "yup";
// import { status } from "@/mocks/arc/inventory";
import { InventoryPrint } from "./inventoryPrint";

export const InventoryInitialValue = {
  Inventory: {
    member: "",
    inventoryCard: "",
    covers: [],
  },
  items: [],
};

export const InventoryValidationSchema = Yup.object({
  Inventory: Yup.object({
    inventoryCard: Yup.string().required("required"),
    items: Yup.array().of(
      Yup.object({
        updateStatus: Yup.string().required("required"),
      })
    ),
  }),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Inventory = React.forwardRef((props, ref) => {
  const { page, handleChangePage, rowPerPage } = props;
  const [members, setMembers] = useState([]);
  const [records, setRecords] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [realRecords, setRealRecords] = useState(0);
  const [covers, setCovers] = useState([]);
  const [coverInput, setCoverInput] = useState("");
  const [finished, setFinished] = useState(false);
  const [status, setStatus] = useState([]);

  const {
    initialValues,
    values,
    touched,
    errors,
    handleChange,
    setFieldValue,
    setSubmitting,
    isSubmitting,
    resetForm,
    setValues,
  } = useFormikContext();

  const handleClose = () => {
    props.setOpen(false);
    if (isSubmitting) resetForm();
  };

  const fetchMemberApi = async () => {
    try {
      const res = await arcApi.getInventoryMembers();

      setMembers(res.items);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStatusApi = async () => {
    try {
      const res = await arcApi.getInventoryStatus();
      if (res.status == 200) {
        setStatus(res.items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecordsSystemApi = async (value) => {
    try {
      const res = await arcApi.getSummaryRecords(value);
      setRecords(res);
      if (res.status === 200) {
        setCoverInput("");
        setValues({
          ...values,
          finishedInventory: false,
          continue: true,
          recordsOfSystem: res.recordsOfSystem,
          confirm: false,
          items: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMemberApi();
    fetchStatusApi();
  }, []);

  const handleSearch = () => {
    const member = values.Inventory.member;
    fetchRecordsSystemApi(member);
  };

  const handleConfirm = async (e) => {
    if (e.key === "Enter") {
      try {
        const member = values.Inventory.member;
        const res = await arcApi.getConfirmCover(coverInput, member);
        if (res.status === 200) {
          setCoverInput("");
          setFieldValue("Inventory.covers", values.Inventory.covers.concat({ cover: coverInput }));
        } else {
          const response = await arcApi.getRecordNotInSystemOfMember(coverInput, member);
          setFieldValue("items", [...values.items, response.value]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (records.recordsOfSystem <= values.Inventory.covers.length) setFieldValue("continue", false);
  }, [coverInput]);

  const handleChangeCover = (e) => setCoverInput(e.target.value);

  const updateMember = (selection) => setFieldValue("Inventory.member", selection || "");

  const updateStatus = (selection, index, numOfCover) => {
    const valueIndex = (page - 1) * rowPerPage + index;
    setFieldValue(`items.${valueIndex}.updateStatus`, selection || "");
  };

  const sendDatoToApi = async () => {
    const data = { ...values.Inventory, records: values.items };

    const res = await arcApi.postFinishInventory(data);
    if (!errors.Inventory) {
      setSubmitting(false);
      if (res.status == 200) {
        setFieldValue("finishedInventory", true);
      }
    }
  };

  const handleFinished = () => {
    setSubmitting(true);
    sendDatoToApi();
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Autocomplete
            name="Inventory.member"
            disablePortal
            id="combo-box-demo"
            options={members}
            renderInput={(params) => <TextField {...params} label="Cán bộ quản lý hồ sơ" />}
            sx={{ width: "50%" }}
            onChange={(_, selection) => updateMember(selection)}
            value={values.Inventory.member || {}}
            defaultValue={Inventory.member || {}}
            getOptionLabel={(option) => option?.name ?? ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <Button sx={{ ml: 2 }} variant="contained" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Box>
        {records?.status == 200 && (
          <Box>
            <Typography variant="h6">Thông tin hồ sơ</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Số liệu hệ thống</TableCell>
                  <TableCell width="15%"></TableCell>
                  <TableCell>Số liệu thực tế</TableCell>
                  <TableCell>Chênh lệch</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{values.recordsOfSystem}</TableCell>
                  <TableCell width="15%">
                    <TextField
                      value={coverInput}
                      variant="standard"
                      onChange={handleChangeCover}
                      onKeyDown={handleConfirm}
                    />
                  </TableCell>
                  <TableCell>{values.Inventory.covers.length}</TableCell>
                  <TableCell>{values.recordsOfSystem - values.Inventory.covers.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}
        {records?.status && records?.status != 200 && <Typography>Không tìm thấy</Typography>}
        {values?.items.length ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" mb={2}>
              Thông tin hồ sơ chênh lệch
            </Typography>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Phân loại kiểm kê</StyledTableCell>
                  <StyledTableCell>Số HĐTD/Số bìa hồ sơ</StyledTableCell>
                  <StyledTableCell>Số seal hồ sơ</StyledTableCell>
                  <StyledTableCell>Thời gian lưu hô sơ</StyledTableCell>
                  <StyledTableCell width="20%">CBQL hồ sơ</StyledTableCell>
                  <StyledTableCell>Trạng thái hô sơ</StyledTableCell>
                  <StyledTableCell>Cập nhật trạng thái</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {values.items
                  ?.slice((page - 1) * rowPerPage, (page - 1) * rowPerPage + rowPerPage)
                  ?.map((el, index) => {
                    const valueIndex = (page - 1) * rowPerPage + index;
                    return (
                      <StyledTableRow key={el.numOfCover}>
                        <StyledTableCell>{el.typeOfInventory}</StyledTableCell>
                        <StyledTableCell>{el.numOfCover}</StyledTableCell>
                        <StyledTableCell>{el.numOfSeal}</StyledTableCell>
                        <StyledTableCell>{el.saveTime}</StyledTableCell>
                        <StyledTableCell width="20%">{el.memberManagement}</StyledTableCell>
                        <StyledTableCell>{el.status}</StyledTableCell>
                        <StyledTableCell>
                          <Autocomplete
                            fullWidth
                            size="small"
                            name={`items.${valueIndex}.updateStatus?.name`}
                            id="combo-box-demo"
                            options={status}
                            onChange={(_, selection) =>
                              updateStatus(selection, index, el.numOfCover)
                            }
                            value={values.items[valueIndex].updateStatus?.name || ""}
                            defaultValue={""}
                            getOptionLabel={(option) => option?.name ?? option}
                            isOptionEqualToValue={(option, value) =>
                              option.code === value.code ||
                              option.name?.toLowerCase() === value.name?.toLowerCase()
                            }
                            renderInput={(params) => (
                              <TextField
                                variant="standard"
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password",
                                }}
                                value={values.items[valueIndex].updateStatus?.name}
                                // error={isSubmitting && errors.Inventory.recordsCompare[index]?.status}
                                // helperText={
                                //   isSubmitting && errors.Inventory.recordsCompare[index]?.status
                                // }
                                {...params}
                              />
                            )}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(values.items.length / rowPerPage)}
                page={page}
                onChange={handleChangePage}
              />
            </Stack>
          </Box>
        ) : (
          ""
        )}
        <Modal
          open={props.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {values?.finishedInventory ? (
              <Typography>Kiểm kê thành công</Typography>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Số phiếu kiểm kê"
                  name="Inventory.inventoryCard"
                  onChange={handleChange}
                  error={isSubmitting && errors.Inventory && errors.Inventory.inventoryCard}
                  helperText={isSubmitting && errors.Inventory && errors.Inventory.inventoryCard}
                />
                <Button
                  sx={{ float: "right", mt: 2 }}
                  variant="contained"
                  color="vib"
                  onClick={handleFinished}
                >
                  Hoàn thành kiểm kê
                </Button>
              </>
            )}
          </Box>
        </Modal>
        <Box sx={{ display: "none" }}>
          <InventoryPrint value={values} ref={ref} />
        </Box>
      </Box>
    </>
  );
});

export default Inventory;
