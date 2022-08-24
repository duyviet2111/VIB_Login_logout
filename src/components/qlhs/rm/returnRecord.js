import React, { useContext, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { createFormTypes } from "@/mocks/createFormTypes";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Container,
  Autocomplete,
  FormControlLabel,
  FormGroup,
  Switch,
  IconButton,
} from "@mui/material";
import { useFormikContext } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Download as DownloadIcon } from "@/icons/download";
import { Upload as UploadIcon } from "@/icons/upload";
import { Plus as PlusIcon } from "@/icons/plus";
import { BorrowAdditionalContext } from "@/components/eadmin/policy/context/borrowAdditional";
import RemoveIcon from "@mui/icons-material/Remove";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ReturnInitialValues = {
  return: [],
};

const options = ["Đề nghị vay vốn", "Chứng minh nhân dân", "Giấy chứng nhận quyền sở hữu"];

export const createFormTypesValidationSchema = Yup.object({
  createFormTypes: Yup.array().of(
    Yup.object().shape({
      detailRecords: Yup.string().required("required"),
      pageNumber: Yup.number().required("required"),
      disbursementRecords: Yup.string().required("required"),
      addMore: Yup.array().of(
        Yup.object({
          detailRecords: Yup.string().required("required"),
          pageNumber: Yup.number().required("required"),
          disbursementRecords: Yup.string().required("required"),
        })
      ),
    })
  ),
});

export const ReturnForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [rmcard, setRmCard] = React.useState(false);

  const [age, setAge] = React.useState("");

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const { initialValues, values, touched, errors, handleChange, setFieldValue } =
    useFormikContext();

  console.log("errors", errors);
  console.log("touched", touched);

  const { selectedRecord, setRmCard, attachedCover } = useContext(BorrowAdditionalContext);

  useEffect(() => {
    setFieldValue("record", selectedRecord);
  }, []);

  const updatedisbursementRecords = (selection, rowIndex) =>
    setFieldValue(`createFormTypes[${rowIndex}].disbursementRecords`, selection || "");

  const updatedisbursementRecordsMore = (selection, rowIndex, index1) =>
    setFieldValue(
      `createFormTypes[${rowIndex}].addMore[${index1}].disbursementRecords`,
      selection || ""
    );

  const updateDetailsRecords = (selection, rowIndex) =>
    setFieldValue(`createFormTypes[${rowIndex}].detailRecords`, selection || "");

  const handleAddMore = (rowIndex) => {
    setFieldValue(
      `createFormTypes[${rowIndex}].addMore`,
      values.createFormTypes[rowIndex].addMore.concat({
        detailRecords: "",
        pageNumber: "",
        disbursementRecords: "",
      })
    );
  };

  const HandleRemoveRow = (rowIndex, index1) => {
    setFieldValue(
      `createFormTypes[${rowIndex}].addMore`,
      values.createFormTypes[rowIndex].addMore.filter((_, index) => index !== index1)
    );
  };

  const handleToggleRMCard = (e) => {
    setRmCard(e.target.checked);
  };

  return (
    <Grid container sx={{ mb: "10px" }}>
      {props.checked ? (
        ""
      ) : (
        <Box component="main" sx={{ flexGrow: 1, my: 4 }}>
          <Container maxWidth="xl">
            <Box>
              <Grid container justifyContent="space-between" spacing={3} alignItems="center">
                <Grid item>
                  <Typography variant="h4">Tạo Hồ Sơ</Typography>
                </Grid>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch onChange={handleToggleRMCard} />}
                    label="RM card"
                  />
                </FormGroup>
              </Grid>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">{`lưu mới_${selectedRecord.fullname}_HĐTD ${selectedRecord.contractNo}`}</Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
      <Grid container>
        <Table size="small">
          <TableHead sx={{ height: "50px" }}>
            <TableRow>
              <TableCell>Nhóm hồ sơ</TableCell>
              <TableCell width="40%">Chi tiết hồ sơ</TableCell>
              <TableCell width="10%">Số trang</TableCell>
              <TableCell>Hình thức chứng từ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.createFormTypes &&
              values.createFormTypes.map((value, index) => {
                return (
                  <>
                    <TableRow key={index * 101} sx={{ position: "relative" }}>
                      <TableCell>{value.nameType}</TableCell>
                      <TableCell width="40%">
                        <Autocomplete
                          fullWidth
                          name={`createFormTypes.${index}.detailRecords`}
                          options={options}
                          size={"small"}
                          onChange={(_, selection) => updateDetailsRecords(selection, index)}
                          value={value.detailRecords}
                          isOptionEqualToValue={(option, value) =>
                            option?.id === value?.id ||
                            option?.label.toLowerCase() === value?.label?.toLowerCase()
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              value={values.createFormTypes?.detailRecords}
                              error={
                                touched.createFormTypes &&
                                touched.createFormTypes[index]?.detailRecords &&
                                errors.createFormTypes
                                  ? errors.createFormTypes[index]?.detailRecords
                                  : undefined
                              }
                              helperText={
                                touched.createFormTypes &&
                                touched?.createFormTypes[index]?.detailRecords &&
                                errors.createFormTypes &&
                                errors?.createFormTypes[index]?.detailRecords
                              }
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell width="10%">
                        <TextField
                          name={`createFormTypes.${index}.pageNumber`}
                          value={value.pageNumber}
                          onChange={handleChange}
                          error={
                            touched.createFormTypes &&
                            touched.createFormTypes[index]?.pageNumber &&
                            errors.createFormTypes
                              ? errors.createFormTypes[index]?.pageNumber
                              : undefined
                          }
                          helperText={
                            touched.createFormTypes &&
                            touched.createFormTypes[index]?.pageNumber &&
                            errors.createFormTypes &&
                            errors.createFormTypes[index]?.pageNumber
                          }
                          id="standard-size-normal"
                          variant="standard"
                          fullWidth
                          inputProps={{ style: { fontSize: "0.875rem" } }}
                        />
                      </TableCell>
                      <TableCell size="small" sx={{ display: "flex", position: "relative" }}>
                        <Autocomplete
                          fullWidth
                          name={`createFormTypes.${index}.disbursementRecords`}
                          options={["Bản sao", "Bản gốc"]}
                          size={"small"}
                          onChange={(_, selection) => updatedisbursementRecords(selection, index)}
                          value={value?.disbursementRecords}
                          isOptionEqualToValue={(option, value) =>
                            option?.id === value?.id ||
                            option?.label.toLowerCase() === value?.label?.toLowerCase()
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              value={values.createFormTypes?.disbursementRecords}
                              error={
                                touched.createFormTypes &&
                                touched.createFormTypes[index]?.disbursementRecords &&
                                errors.createFormTypes
                                  ? errors.createFormTypes[index]?.disbursementRecords
                                  : undefined
                              }
                              helperText={
                                touched.createFormTypes &&
                                touched?.createFormTypes[index]?.disbursementRecords &&
                                errors.createFormTypes &&
                                errors?.createFormTypes[index]?.disbursementRecords
                              }
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell sx={{ position: "absolute", top: "-6px", right: "-40px" }}>
                        <IconButton onClick={() => handleAddMore(index)}>
                          <PlusIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {value.addMore.map((more, index1) => (
                      <TableRow key={(index1 + 37) * 23} sx={{ position: "relative" }}>
                        <TableCell></TableCell>
                        <TableCell>
                          <TextField
                            name={`createFormTypes.${index}.addMore.${index1}.detailRecords`}
                            value={more.detailRecords}
                            onChange={handleChange}
                            error={
                              touched.createFormTypes && errors.createFormTypes
                                ? errors?.createFormTypes[index]?.addMore[index1]?.detailRecords
                                : undefined
                            }
                            helperText={
                              touched.createFormTypes && errors.createFormTypes
                                ? errors?.createFormTypes[index]?.addMore[index1]?.detailRecords
                                : undefined
                            }
                            id="standard-size-normal"
                            variant="standard"
                            fullWidth
                            inputProps={{ style: { fontSize: "0.875rem" } }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`createFormTypes.${index}.addMore.${index1}.pageNumber`}
                            value={more.pageNumber}
                            onChange={handleChange}
                            error={
                              touched.createFormTypes && errors.createFormTypes
                                ? errors?.createFormTypes[index]?.addMore[index1]?.pageNumber
                                : undefined
                            }
                            helperText={
                              touched.createFormTypes && errors.createFormTypes
                                ? errors?.createFormTypes[index]?.addMore[index1]?.pageNumber
                                : undefined
                            }
                            fullWidth
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell>
                          <Autocomplete
                            fullWidth
                            name={`createFormTypes.${index}.addMore.${index1}.disbursementRecords`}
                            options={["Bản sao", "Bản gốc"]}
                            size={"small"}
                            onChange={(_, selection) =>
                              updatedisbursementRecordsMore(selection, index, index1)
                            }
                            value={more.disbursementRecords}
                            isOptionEqualToValue={(option, value) =>
                              option?.id === value?.id ||
                              option?.label.toLowerCase() === value?.label?.toLowerCase()
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                value={more.disbursementRecords}
                                error={
                                  touched.createFormTypes && errors.createFormTypes
                                    ? errors?.createFormTypes[index]?.addMore[index1]
                                        ?.disbursementRecords
                                    : undefined
                                }
                                helperText={
                                  touched.createFormTypes && errors.createFormTypes
                                    ? errors?.createFormTypes[index]?.addMore[index1]
                                        ?.disbursementRecords
                                    : undefined
                                }
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell sx={{ position: "absolute", top: "-6px", right: "-40px" }}>
                          <IconButton onClick={() => HandleRemoveRow(index, index1)}>
                            <RemoveIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                );
              })}
            {attachedCover && (
              <TableRow>
                <TableCell>So bia hồ sơ :</TableCell>
                <TableCell>{attachedCover}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};
