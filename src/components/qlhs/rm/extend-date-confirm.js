import * as React from "react";
import { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Grid, Box, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import { BorrowAdditionalContext } from "@/components/eadmin/policy/context/borrowAdditional";
// import { components } from "react-select";

export const ExtendInitialValue = {
  extend: {
    date: null,
    reason: "",
  },
};

export const ExtendValidateioSchema = Yup.object({
  extend: Yup.object({
    date: Yup.date().nullable().required("required"),
  }),
});

export default function ReturnDateConfirm() {
  const [value, setValue] = React.useState(null);
  const { initialValues, values, touched, errors, handleChange, setFieldValue } =
    useFormikContext();

  // const { borrowAdditionalState } = useContext(BorrowAdditionalContext);

  // useEffect(() => {
  //   setFieldValue("step1.records", borrowAdditionalState);
  // }, []);

  return (
    <Grid container sx={{ mt: 2 }}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label="Thời gian gia hạn đến ngày"
          name="extend.date"
          value={values.extend?.date}
          onChange={(value) => setFieldValue("extend.date", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={values.extend?.date}
              fullWidth
              sx={{ mb: 2 }}
              error={touched.extend?.date ? errors.extend?.date : undefined}
              helperText={touched.extend?.date && errors.extend?.date}
            />
          )}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        placeholder="Nguyên nhân gia hạn"
        label="Nguyên nhân gia hạn"
        name="extend.reason"
        value={values.extend?.reason}
        onChange={handleChange}
      />
    </Grid>
  );
}
