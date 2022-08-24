import React, { useContext } from "react";
import { Box, TextField, Stack, Grid, Button, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "../../../icons/search";
// import { Restore as RestoreIcon } from "../../../icons/r";
import RestoreIcon from "@mui/icons-material/Restore";
import { listMember } from "@/mocks/listMemberBorrowRecords";
import { BorrowContext } from "./context/borrow";
import { useFormikContext } from "formik";

const FilterRecors = ({ values, fetchApi, setInputValue, inputValue }) => {
  const getValueFromInput = (e) => {
    setInputValue(e.target.value);
  };

  const { setRecords } = useContext(BorrowContext);
  const { setFieldValue } = useFormikContext();

  const handleSearch = () => {
    fetchApi(inputValue);
    // console.log("call API to get value");
    // const filter = listMember.filter((value) => {
    //   if (value.numberOfCIF == inputValue) {
    //     return value.numberOfCIF == inputValue;
    //   }
    //   if (value.numberOfLOS == inputValue) {
    //     return value.numberOfLOS == inputValue;
    //   }
    //   if (value.fullName.toLowerCase() == inputValue.toLowerCase()) {
    //     return value.fullName.toLowerCase() == inputValue.toLowerCase();
    //   }
    // });

    // if (filter.length) {
    //   setRecords(filter);
    // } else {
    //   setRecords(false);
    // }
  };

  const handleRestore = () => {
    setRecords([]);
    setInputValue("");
    setFieldValue("recordsSelected", []);
  };

  return (
    <>
      <Grid container>
        <Box sx={{ width: "100%" }}>
          <TextField
            value={inputValue}
            fullWidth
            // inputProps={{ ref: queryRef }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            placeholder="Số bìa/Số LOS/Tên khách hàng/CIF"
            onChange={getValueFromInput}
            // inputRef={valueRef}
          />
        </Box>
      </Grid>
      <Grid container sx={{ justifyContent: "flex-end", mt: 1 }}>
        <Button sx={{ ml: 1 }} startIcon={<RestoreIcon />} onClick={handleRestore}>
          Khôi phục mặc định
        </Button>
        <Button sx={{ ml: 1 }} onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </Grid>
    </>
  );
};

export default FilterRecors;
