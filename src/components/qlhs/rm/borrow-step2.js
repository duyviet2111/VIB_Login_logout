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
import { components } from "react-select";

export const BorrowStep2InitialValue = {
  step1: {
    date: null,
    note: "",
    records: [],
  },
};

export const BorrowStep2ValidateioSchema = Yup.object({
  step1: Yup.object({
    date: Yup.date().nullable().required("required"),
  }),
});

export default function BorrowStep2() {
  const [value, setValue] = React.useState(null);
  const { initialValues, values, touched, errors, handleChange, setFieldValue } =
    useFormikContext();

  // const { borrowAdditionalState } = useContext(BorrowAdditionalContext);

  // useEffect(() => {
  //   setFieldValue("step1.records", borrowAdditionalState);
  // }, []);

  return (
    <Grid container sx={{ mt: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">Mượn hồ sơ</Typography>
        {/* {values.step1.records.map((record) => (
          <Typography key={record.id}>{record.fullname}</Typography>
        ))} */}
      </Box>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label="Ngày trả"
          name="step1.date"
          value={values.step1?.date}
          onChange={(value) => setFieldValue("step1.date", value)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={values.step1?.date}
              fullWidth
              sx={{ mb: 2 }}
              error={touched.step1?.date ? errors.step1?.date : undefined}
              helperText={touched.step1?.date && errors.step1?.date}
            />
          )}
        />
      </LocalizationProvider>
      <TextField
        fullWidth
        placeholder="Ghi chú"
        label="Ghi chú"
        name="step1.note"
        value={values.step1?.note}
        onChange={handleChange}
      />
    </Grid>
  );
}
