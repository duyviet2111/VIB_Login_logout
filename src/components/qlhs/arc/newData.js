import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useFormikContext } from "formik";
import { ARCContext } from "./context/arcContext";
import CloseIcon from "@mui/icons-material/Close";
import { StyledTableRow, StyledTableCell } from "@/components/styles/table";
import { arcApi } from "../../../__api__/arc/Arc-api";

const StyledTextField = withStyles((theme) => ({
  decoration: new InputDecoration({ border: InputBorder.none }),
}))(TextField);

const NewData = ({ page, setShowModal }) => {
  const [checked, setChecked] = React.useState([]);
  const [errMessage, setErrMessage] = useState("");
  const { values, touched, errors, setFieldValue, handleChange, setValues } = useFormikContext();
  const [snack, setSnack] = React.useState(false);
  const ref = useRef();

  const { print } = useContext(ARCContext);

  const fetchApi = async (cover) => {
    try {
      return await arcApi.getRecordwithCoverNumber(cover);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (value) => {
    const currentIndex = values.store.indexOf(value);
    const newChecked = [...values.store];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setFieldValue("store", newChecked);
  };

  useEffect(() => {
    if (values.printData.length > 1 && checked) {
      setFieldValue("store", values.printData);
    }
    if (!checked) setFieldValue("store", []);
  }, [checked]);

  const handleChangeAll = (event) => {
    setChecked(event.target.checked);
  };

  const handleDeleteRow = (rowIndex) => {
    setFieldValue(
      "printData",
      values.printData.filter((_, index) => index !== rowIndex)
    );
  };

  const handleBlurInput = () => {};

  const handleEnter = async (e, index) => {
    const cover = values.printData[index].numOfHĐTD;
    if (e.key === "Enter") {
      ref.current.blur();
      const response = await fetchApi(cover);
      if (response.status == 200) {
        setShowModal(true);
        const value = {
          ...values.printData[index],
          statusOfRecord: response.value.recordStatus,
          memberManageRecord: response.value.memberManagement,
        };
        setFieldValue(`printData.[${index}]`, value);
      } else {
        setErrMessage(response.message);
        setSnack(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Table>
        <TableHead>
          <StyledTableRow>
            {!print ? (
              <StyledTableCell>
                <Checkbox onChange={handleChangeAll} />
              </StyledTableCell>
            ) : (
              <StyledTableCell></StyledTableCell>
            )}
            <StyledTableCell>Số HĐTD/Số bìa hồ sơ</StyledTableCell>
            <StyledTableCell>Trạng thái hồ sơ</StyledTableCell>
            <StyledTableCell>Số seal hồ sơ</StyledTableCell>
            <StyledTableCell>CBQL hồ sơ</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {values.printData &&
            values.printData.map((data, index) => (
              <StyledTableRow key={index} sx={{ position: "relative" }}>
                {!print ? (
                  <StyledTableCell>
                    <Checkbox
                      checked={values.store.indexOf(data) !== -1}
                      tabIndex={-1}
                      onClick={() => handleCheck(data)}
                    />
                  </StyledTableCell>
                ) : (
                  <StyledTableCell></StyledTableCell>
                )}

                <StyledTableCell>
                  <TextField
                    inputRef={ref}
                    name={`printData.${index}.numOfHĐTD`}
                    value={data.numOfHĐTD}
                    onChange={handleChange}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    onKeyDown={(e) => handleEnter(e, index)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    name={`printData.${index}.statusOfRecord`}
                    value={data.statusOfRecord}
                    onChange={handleChange}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    name={`printData.${index}.numOfSeal`}
                    value={data.numOfSeal}
                    onChange={handleChange}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    name={`printData.${index}.memberManageRecord`}
                    value={data.memberManageRecord}
                    onChange={handleChange}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ position: "absolute", right: "-55px" }}>
                  {data.numOfHĐTD ? (
                    <IconButton onClick={() => handleDeleteRow(index)}>
                      <CloseIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <Snackbar
        open={snack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errMessage}
        action={action}
      />
    </>
  );
};

export default NewData;
