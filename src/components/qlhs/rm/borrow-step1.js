import { rmApi } from "@/__api__/rm/rmApi";
import {
  Box,
  Container,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import React, { useContext, useEffect } from "react";
import FilterRecords from "./borrow-filter-records";
import { BorrowContext } from "./context/borrow";

export const recordsSelectedInitialValues = {
  recordsSelected: [],
};

const BorrowStep1 = () => {
  const [checked, setChecked] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowIndex, setRowIndex] = React.useState([]);
  const [loadData, setLoadData] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const { initialValues, values, touched, errors, handleChange, setFieldValue } =
    useFormikContext();
  const { records, borrowSelected, setBorrowSelected, setData, data } = useContext(BorrowContext);

  const fetchApi = async (filter, page) => {
    try {
      const res = await rmApi.getSearchRecords(filter, page);
      if (res.status == 200) {
        setData(res);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = (value, index) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setBorrowSelected(newChecked);
  };

  useEffect(() => {
    setFieldValue("recordsSelected", borrowSelected);
  }, [checked]);

  // ---pagination----
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchApi(inputValue, newPage);
  };

  // ----pagination----

  const filterList = (items) => (
    <Grid container>
      <Table>
        <TableHead sx={{ height: "40px" }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox sx={{ opacity: 0 }} />
            </TableCell>
            <TableCell>Số HĐTD/Số LOS</TableCell>
            <TableCell>Số CIF</TableCell>
            <TableCell>Họ và tên</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items &&
            items.map((value, index) => {
              const labelId = `transfer-list-item-${value}-label`;
              return (
                <TableRow
                  key={(index + 1) * 201}
                  onClick={handleToggle(value)}
                  hover
                  sx={{ cursor: "pointer" }}
                  // style={{ height: 10 }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={borrowSelected.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell>{value.numberOfLOS}</TableCell>
                  <TableCell>{value.numberOfCIF}</TableCell>
                  <TableCell>{value.fullName}</TableCell>
                  <TableCell>{value.status}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
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
      <Grid container>
        <FilterRecords
          setLoadData={setLoadData}
          fetchApi={fetchApi}
          loadData={loadData}
          setInputValue={setInputValue}
          inputValue={inputValue}
          values={values}
        />
      </Grid>
      {data?.items ? (
        <>
          <Typography variant="h5">Thông tin hồ sơ</Typography>
          <Grid container sx={{ border: "1px solid #ccc" }}>
            {filterList(data.items)}
          </Grid>
          <Stack spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Pagination
              count={data.totalPage}
              page={data.currentPage}
              onChange={handleChangePage}
            />
          </Stack>
        </>
      ) : (
        ""
      )}
      {error && <Box>Không tìm thấy kết quả</Box>}
    </Grid>
  );
};

export default BorrowStep1;
