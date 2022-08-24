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
import { createFormApi } from "../../__api__/rm/createForm";
import { createFormReturnApi } from "../../__api__/rm/return";

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

export const createFormTypesInitialValues = {
  record: {},
  numOfCover: "",
};

export const createFormTypesValidationSchema = Yup.object({
  formGroup: Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        detailRecord: Yup.array().of(
          Yup.object({
            detailId: Yup.object({
              typeRecord: Yup.string().required("required"),
            }),
            pageNumber: Yup.number().required("required"),
            disbursementRecords: Yup.string().required("required"),
          })
        ),
      })
    ),
  }),
});

const defaultDocDetailOption = {
  id: "",
  typeRecord: "",
};

export const QlhsCreateForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState("");
  const { initialValues, values, touched, errors, handleChange, setFieldValue } =
    useFormikContext();

  const { selectedRecord, setRmCard, attachedCover } = useContext(BorrowAdditionalContext);

  const fetchApi = async () => {
    const res = await createFormApi.getCreateForms(selectedRecord);
    res?.items.map((el) =>
      el.detailRecord.push({
        detailId: { id: "", typeRecord: "" },
        pageNumber: "",
        disbursementRecords: "",
      })
    );
    setFieldValue("formGroup", res);
  };

  const fetchApiReturn = async () => await createFormReturnApi.getCreateFormsReturn(selectedRecord);
  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchReturn = async () => {
      const value = await fetchApiReturn();
      setFieldValue("formGroup", value);
    };
    if (props.checked) fetchReturn();
  }, [props.checked]);

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    setFieldValue("record", selectedRecord);
  }, []);

  const updatedisbursementRecords = (selection, rowIndex, subIndex) =>
    setFieldValue(
      `formGroup.items.[${rowIndex}].detailRecord.[${subIndex}].disbursementRecords`,
      selection || ""
    );

  const updatedisbursementRecordsMore = (selection, rowIndex, index1) =>
    setFieldValue(
      `createFormTypes[${rowIndex}].addMore[${index1}].disbursementRecords`,
      selection || ""
    );
  const updatedisDetailRecordsMore = (selection, rowIndex, index1) =>
    setFieldValue(`createFormTypes[${rowIndex}].addMore[${index1}].detailRecords`, selection || "");

  const updateDetailsRecords = (selection, rowIndex, subIndex) => {
    setFieldValue(
      `formGroup.items.[${rowIndex}].detailRecord.[${subIndex}].detailId`,
      selection || ""
    );
  };

  const handleAddMore = (rowIndex, subIndex) => {
    setFieldValue(
      `formGroup.items.[${rowIndex}].detailRecord`,
      values.formGroup.items[rowIndex].detailRecord.concat({
        detailId: {
          id: "",
          typeRecord: "",
        },
        pageNumber: "",
        disbursementRecords: "",
      })
    );
  };

  const HandleRemoveRow = (rowIndex, subIndex) => {
    setFieldValue(
      `formGroup.items.[${rowIndex}].detailRecord`,
      values.formGroup.items[rowIndex].detailRecord.filter((_, index) => index !== subIndex)
    );
  };

  // const handleToggleRMCard = (e) => {
  //   setRmCard(e.target.checked);
  // };

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
                {/* <FormGroup>
                  <FormControlLabel
                    control={<Switch onChange={handleToggleRMCard} />}
                    label="RM card"
                  />
                </FormGroup> */}
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
            {values?.formGroup?.items &&
              values?.formGroup?.items.map((value, index) => {
                const dropDownList = value.dropDownList.map((el) => el.typeRecord);
                return value.detailRecord.map((subValue, subIndex) => {
                  return (
                    <TableRow key={value.id} sx={{ position: "relative" }}>
                      <TableCell>{subIndex === 0 && value.formGroupField}</TableCell>
                      <TableCell width="40%">
                        {value.formGroupField.toLowerCase() === "hồ sơ khác" ? (
                          <TextField
                            name={`formGroup.items.${index}.detailRecord.${subIndex}.detailId.typeRecord`}
                            value={subValue.detailId.typeRecord}
                            onChange={handleChange}
                            error={
                              touched.formGroup && errors.formGroup
                                ? errors?.formGroup.items[index]?.detailRecord[subIndex]?.detailId
                                    ?.typeRecord
                                : undefined
                            }
                            helperText={
                              touched.formGroup && errors.formGroup
                                ? errors?.formGroup.items[index]?.detailRecord[subIndex]?.detailId
                                    ?.typeRecord
                                : undefined
                            }
                            id="standard-size-normal"
                            variant="standard"
                            fullWidth
                            inputProps={{ style: { fontSize: "0.875rem" } }}
                          />
                        ) : (
                          <Autocomplete
                            fullWidth
                            name={`formGroup.items.${index}.detailRecord.${subIndex}.detailId.typeRecord`}
                            options={[defaultDocDetailOption, ...value.dropDownList]}
                            defaultValue={subValue?.detailId.typeRecord || ""}
                            value={subValue?.detailId.typeRecord || ""}
                            getOptionLabel={(option) => option?.typeRecord ?? option}
                            isOptionEqualToValue={(option, value) => option.typeRecord === value}
                            size={"small"}
                            onChange={(_, selection) =>
                              updateDetailsRecords(selection, index, subIndex)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                value={subValue.detailId.typeRecord}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password",
                                }}
                                error={
                                  touched.formGroup && errors.formGroup
                                    ? errors?.formGroup.items[index]?.detailRecord[subIndex]
                                        ?.detailId?.typeRecord
                                    : undefined
                                }
                                helperText={
                                  touched.formGroup && errors.formGroup
                                    ? errors?.formGroup.items[index]?.detailRecord[subIndex]
                                        ?.detailId?.typeRecord
                                    : undefined
                                }
                              />
                            )}
                          />
                        )}
                      </TableCell>
                      <TableCell width="10%">
                        <TextField
                          name={`formGroup.items.${index}.detailRecord.${subIndex}.pageNumber`}
                          value={subValue.pageNumber}
                          onChange={handleChange}
                          error={
                            touched.formGroup && errors.formGroup
                              ? errors?.formGroup.items[index]?.detailRecord[subIndex]?.pageNumber
                              : undefined
                          }
                          helperText={
                            touched.formGroup && errors.formGroup
                              ? errors?.formGroup.items[index]?.detailRecord[subIndex]?.pageNumber
                              : undefined
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
                          name={`formGroup.items.${index}.detailRecord.disbursementRecords`}
                          options={["", "Bản sao", "Bản gốc"]}
                          defaultValue={subValue.disbursementRecords}
                          value={subValue.disbursementRecords}
                          isOptionEqualToValue={(option, value) => option === value}
                          size={"small"}
                          onChange={(_, selection) =>
                            updatedisbursementRecords(selection, index, subIndex)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              value={subValue.disbursementRecords}
                              error={
                                touched.formGroup && errors.formGroup
                                  ? errors?.formGroup.items[index]?.detailRecord[subIndex]
                                      ?.disbursementRecords
                                  : undefined
                              }
                              helperText={
                                touched.formGroup && errors.formGroup
                                  ? errors?.formGroup.items[index]?.detailRecord[subIndex]
                                      ?.disbursementRecords
                                  : undefined
                              }
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell sx={{ position: "absolute", top: "-6px", right: "-40px" }}>
                        {subIndex === 0 ? (
                          <IconButton onClick={() => handleAddMore(index, subIndex)}>
                            <PlusIcon />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => HandleRemoveRow(index, subIndex)}>
                            <RemoveIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                });
              })}
            {attachedCover ? (
              <TableRow>
                <TableCell>Số bìa hồ sơ :</TableCell>
                <TableCell>{attachedCover}</TableCell>
              </TableRow>
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};
