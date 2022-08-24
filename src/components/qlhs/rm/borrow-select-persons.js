import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {
  Paper,
  Box,
  Container,
  Typography,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Stack,
  TablePagination,
  InputAdornment,
} from "@mui/material";
import { useFormikContext } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";
import { listMember } from "../../../__mocks__/listMemberBorrowRecords";
import { Search as SearchIcon } from "../../../icons/search";
import FilterRecords from "./borrow-filter-records";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export const selectPersoninitialValue = {
  selectPerson: [],
};

const TransferList = () => {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(listMember);
  const [right, setRight] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageRight, setPageRight] = React.useState(0);
  const [rowsPerPageRight, setRowsPerPageRight] = React.useState(10);
  const [rowIndex, setRowIndex] = React.useState([]);
  const [loadData, setLoadData] = React.useState(false);
  const { initialValues, values, touched, errors, handleChange, setFieldValue } =
    useFormikContext();

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, values.selectPerson);

  const handleToggle = (value, index) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    if (index !== undefined) {
      rowIndex.push(index);
      setRowIndex(rowIndex);
    }
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    setFieldValue(
      "selectPerson",
      values.selectPerson.concat(
        left.map((data) => ({
          numberOfLOS: data.numberOfLOS,
          numberOfCIF: data.numberOfCIF,
          fullName: data.fullName,
        }))
      )
    );
  };

  const handleCheckedRight = () => {
    const filter = leftChecked.filter(
      (data) =>
        !values.selectPerson.find((dublicateData) => dublicateData.numberOfCIF == data.numberOfCIF)
    );

    setRight(values.selectPerson.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    setFieldValue(
      "selectPerson",
      values.selectPerson.concat(
        filter.map((data) => ({
          numberOfLOS: data.numberOfLOS,
          numberOfCIF: data.numberOfCIF,
          fullName: data.fullName,
        }))
      )
    );
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(values.selectPerson, rightChecked));
    setChecked(not(checked, rightChecked));
    setFieldValue(
      "selectPerson",
      values.selectPerson.filter((_, index) => !rowIndex.includes(index))
    );
    setRowIndex([]);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    setFieldValue("selectPerson", []);
  };

  // ---pagination----
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangePageRight = (event, newPage) => {
    setPageRight(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeRowsPerPageRight = (event) => {
    setRowsPerPageRight(parseInt(event.target.value, 10));
    setPageRight(0);
  };
  // ----pagination----

  const customListLeft = (items) => (
    <Grid container sx={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Table size="small">
        <TableHead sx={{ height: "50px" }}>
          <TableRow>
            <TableCell>Số HĐTD/Số LOS</TableCell>
            <TableCell>Số CIF</TableCell>
            <TableCell>Họ và tên</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => {
            const labelId = `transfer-list-item-${value}-label`;
            return (
              <TableRow
                key={(index + 1) * 201}
                onClick={handleToggle(value)}
                hover
                sx={{ cursor: "pointer" }}
              >
                <TableCell sx={{ display: "flex" }}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </ListItemIcon>
                  <div style={{ lineHeight: "58px" }}>{value.numberOfLOS}</div>
                </TableCell>
                <TableCell>{value.numberOfCIF}</TableCell>
                <TableCell>{value.fullName}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {items.length > 0 && (
        <Stack spacing={2} sx={{ mb: 2, mt: 2, position: "absolute", bottom: "-15px" }}>
          <TablePagination
            component="div"
            count={items.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      )}
    </Grid>
  );
  const customListRight = (items) => (
    <Grid container sx={{ paddingBottom: "50px", justifyContent: "center" }}>
      <Table size="small">
        <TableHead sx={{ height: "50px" }}>
          <TableRow>
            <TableCell width="35%">Số HĐTD/Số LOS</TableCell>
            <TableCell width="25%">Số CIF</TableCell>
            <TableCell width="40%">Họ và tên</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.selectPerson &&
            values.selectPerson
              .slice(pageRight * rowsPerPageRight, pageRight * rowsPerPageRight + rowsPerPageRight)
              .map((value, index) => {
                const labelId = `transfer-list-item-${value}-label`;
                return (
                  <TableRow
                    key={(index + 1) * 301}
                    onClick={handleToggle(value, index)}
                    hover
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell width="35%" sx={{ display: "flex" }}>
                      <ListItemIcon>
                        <Checkbox
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </ListItemIcon>
                      <div style={{ lineHeight: "58px" }}>{value.numberOfLOS}</div>
                    </TableCell>
                    <TableCell width="25%">{value.numberOfCIF}</TableCell>
                    <TableCell width="40%">{value.fullName}</TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      {values.selectPerson.length > 0 && (
        <Stack spacing={2} sx={{ mb: 2, mt: 2, bottom: "-15px", position: "absolute" }}>
          <TablePagination
            component="div"
            count={values.selectPerson.length}
            page={pageRight}
            onPageChange={handleChangePageRight}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPageRight}
          />
        </Stack>
      )}
    </Grid>
  );

  return (
    <Grid container>
      <Box component="main" sx={{ flexGrow: 1, mb: 2 }}>
        <Container maxWidth="xl">
          <Box>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Mượn Hồ Sơ</Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Grid container sx={{ mb: 2, alignItems: "center" }}>
        <FilterRecords
          left={left}
          setLoadData={setLoadData}
          loadData={loadData}
          setLeft={setLeft}
          values={values}
        />
      </Grid>
      <Grid container>
        <Grid
          item
          md={5}
          lg={5}
          xl={5}
          sx={{ border: "1px solid #ccc", position: "relative", height: "810px" }}
        >
          {customListLeft(left)}
        </Grid>
        <Grid item md={2} lg={2} xl={2} sx={{ display: "flex", alignItems: "center" }}>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          md={5}
          lg={5}
          xl={5}
          sx={{ border: "1px solid #ccc", position: "relative", height: "810px" }}
        >
          {customListRight(right)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransferList;
