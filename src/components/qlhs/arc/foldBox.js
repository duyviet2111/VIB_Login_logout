import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  Checkbox,
  TableBody,
  TextField,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StyledTableRow, StyledTableCell } from "@/components/styles/table";
import { arcApi } from "../../../__api__/arc/Arc-api";
import { useFormikContext } from "formik";
import ShowErrorCode from "../utils/showError";

const FoldBox = ({ setConfirm }) => {
  const [cover, setCover] = useState("");
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { values, setFieldValue, handleChange, setValues, setSubmitting } = useFormikContext();

  const fetchApi = async (value) => {
    try {
      return await arcApi.getRecordData(value);
    } catch (err) {
      console.log(err);
    }
  };

  const handlechangeCover = (e, index) => {
    setCover(e.target.value);
  };

  const handleEnter = async (e, index) => {
    if (e.key == "Enter") {
      const res = await fetchApi(cover);
      if (res.status == 200) {
        setFieldValue("waittingApprove", values.waittingApprove.concat(res));
      } else {
        setOpen(true);
        setErrorMessage(res.message);
      }

      setCover("");
    }
  };

  const handleDeleteRow = (rowIndex) => {
    setFieldValue(
      "waittingApprove",
      values.waittingApprove.filter((_, index) => index !== rowIndex)
    );
  };

  const handleContinued = () => {
    setConfirm(true);
    const listId = values.waittingApprove.map((el) => {
      return { recordId: el.id };
    });
    setFieldValue("box.listRecordId", listId);
    setSubmitting(false);
  };

  return (
    <>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Số HĐTD/Số bìa hồ sơ</StyledTableCell>
            <StyledTableCell>Số seal hồ sơ</StyledTableCell>
            <StyledTableCell>CBQL hồ sơ</StyledTableCell>
            <StyledTableCell>Trạng thái hồ sơ</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {values.waittingApprove.map((el, index) => (
            <StyledTableRow key={el.id} sx={{ position: "relative" }}>
              <StyledTableCell>{el.numOfCover}</StyledTableCell>
              <StyledTableCell>{el.numOfSeal}</StyledTableCell>
              <StyledTableCell>{el.memberManagement}</StyledTableCell>
              <StyledTableCell>{el.recordStatus}</StyledTableCell>
              <StyledTableCell
                sx={{ position: "absolute", borderBottom: "none", right: "-45px", top: "-5px" }}
              >
                <IconButton onClick={() => handleDeleteRow(index)}>
                  <CloseIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow>
            <StyledTableCell>
              <TextField
                variant="standard"
                // InputProps={{
                //   disableUnderline: true,
                // }}
                onChange={handlechangeCover}
                value={cover}
                onKeyDown={(e) => handleEnter(e)}
              />
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <Divider sx={{ my: 4 }} />
      <Button
        disabled={values.waittingApprove.length ? false : true}
        variant="contained"
        sx={{ float: "right" }}
        onClick={handleContinued}
      >
        Tiếp tục
      </Button>
      <ShowErrorCode setOpen={setOpen} message={errorMessage} open={open} />
    </>
  );
};

export default FoldBox;
