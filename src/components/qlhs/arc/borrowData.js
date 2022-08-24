import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
} from "@mui/material";
import { StyledTableRow, StyledTableCell } from "@/components/styles/table";
import CloseIcon from "@mui/icons-material/Close";

const BorrowData = ({ data, print, checked, setChecked, handleDeleteRow }) => {
  const handleCheck = (value) => {
    const currentIndex = checked.findIndex(
      (c) =>
        c.numOfHDTD === value.numOfHDTD &&
        c.numOfSeal === value.numOfSeal &&
        c.timeReturn === value.timeReturn &&
        c.recordStatus === value.recordStatus &&
        c.id === value.id
    );
    console.log("currentIndex", currentIndex);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log("newChecked", newChecked);
    setChecked(newChecked);
  };

  const handleChangeAll = (e) => {
    const check = e.target.checked;
    if (check) setChecked(data.items);
    if (!check) setChecked([]);
  };

  return (
    <Table>
      {data !== undefined && (
        <>
          <TableHead>
            <StyledTableRow>
              {!print && (
                <StyledTableCell>
                  <Checkbox onChange={handleChangeAll} />
                </StyledTableCell>
              )}
              <StyledTableCell>Số HĐTD/Số bìa hồ sơ</StyledTableCell>
              <StyledTableCell>Số Seal hồ sơ</StyledTableCell>
              <StyledTableCell>Thời gian hoàn trả</StyledTableCell>
              <StyledTableCell>Trạng thái hồ sơ</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.items?.map((recordsData, index) => {
              const rowSelected =
                checked.findIndex(
                  (c) =>
                    c.numOfHDTD === recordsData.numOfHDTD &&
                    c.numOfSeal === recordsData.numOfSeal &&
                    c.timeReturn === recordsData.timeReturn &&
                    c.recordStatus === recordsData.recordStatus &&
                    c.id === recordsData.id
                ) > -1;

              return (
                <StyledTableRow key={recordsData.id} sx={{ position: "relative" }}>
                  {!print && (
                    <StyledTableCell>
                      <Checkbox
                        checked={rowSelected}
                        tabIndex={-1}
                        onClick={() => handleCheck(recordsData)}
                      />
                    </StyledTableCell>
                  )}
                  <StyledTableCell>{recordsData.numOfHDTD}</StyledTableCell>
                  <StyledTableCell>{recordsData.numOfSeal}</StyledTableCell>
                  <StyledTableCell>{recordsData.timeReturn}</StyledTableCell>
                  <StyledTableCell>{recordsData.recordStatus}</StyledTableCell>
                  <StyledTableCell sx={{ position: "absolute", right: "-44px" }}>
                    <IconButton onClick={() => handleDeleteRow(recordsData.id)}>
                      <CloseIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </>
      )}
    </Table>
  );
};

export default React.memo(BorrowData);
