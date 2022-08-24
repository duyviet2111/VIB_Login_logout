import React, { useContext, useState, useEffect } from "react";

import {
  Typography,
  Box,
  Autocomplete,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import { useFormikContext } from "formik";
import * as Yup from "yup";

import WizardStep from "./step-common";

import { listMember, documentTypes } from "@/mocks/index";
import { ApproveContext } from "./context/approveContext";

export const Step1InitialValues = {
  step1: {
    documentType: {
      id: 0,
      label: "",
    },
    documentName: "",
    needApproved: "false",
    approvedPerson: {
      id: 0,
      label: "",
    },
  },
};

export const Step1ValidationSchema = Yup.object({
  step1: Yup.object({
    documentType: Yup.object({
      label: Yup.string().required("required"),
    }).required("required"),
    documentName: Yup.string().required("required"),
    approvedPerson: Yup.object().when("needApproved", {
      is: "false",
      then: Yup.object({
        label: Yup.string().required("required"),
      }),
    }),
  }),
});

const Step1 = () => {
  const { initialValues, values, touched, errors, handleChange, setFieldValue } =
    useFormikContext();

  const updateDocumentType = (_, selection) => setFieldValue("step1.documentType", selection);
  const updateApprovedPerson = (_, selection) => setFieldValue("step1.approvedPerson", selection);
  const { setApprovement } = useContext(ApproveContext);

  useEffect(() => {
    setApprovement(values.step1.needApproved);
  }, [values.step1.needApproved]);

  return (
    <WizardStep
      onSubmit={() => console.log("Step1 onSubmit")}
      validationSchema={Step1ValidationSchema}
    >
      <Typography variant="h6" component="h2" sx={{ mb: "18px", mt: "10px" }}>
        Thông tin văn bản
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Autocomplete
          name="step1.documentType"
          onChange={updateDocumentType}
          value={values.step1?.documentType || {}}
          options={documentTypes}
          getOptionLabel={(option) => option?.label ?? ""}
          defaultValue={initialValues.step1?.documentType || {}}
          isOptionEqualToValue={(option, value) =>
            option?.id === value?.id || option?.label.toLowerCase() === value?.label?.toLowerCase()
          }
          error={touched.step1?.documentType ? errors.step1?.documentType : undefined}
          // helperText={touched.step1?.documentType && errors.step1?.documentType}
          sx={{ mb: "18px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={values.step1?.documentType?.label}
              label="Loại văn bản"
              error={
                touched.step1?.documentType?.label ? errors.step1?.documentType?.label : undefined
              }
              helperText={touched.step1?.documentType?.label && errors.step1?.documentType?.label}
            />
          )}
        />
        <TextField
          label="Tên văn bản"
          id="documentName"
          name="step1.documentName"
          value={values.step1?.documentName}
          onChange={handleChange}
          error={touched.step1?.documentName ? errors.step1?.documentName : undefined}
          helperText={touched.step1?.documentName && errors.step1?.documentName}
        ></TextField>
      </Box>
      <Typography sx={{ mt: "18px" }}>Bạn có cần trình duyệt văn bản?</Typography>

      <RadioGroup
        row
        aria-labelledby="radio-buttons-group-label"
        name="step1.needApproved"
        value={values.step1?.needApproved}
        defaultValue={false}
        onChange={handleChange}
        sx={{ m: "15px 9px" }}
      >
        <FormControlLabel value={true} control={<Radio id="true" />} label="Có" />
        <FormControlLabel value={false} control={<Radio id="false" />} label="Không" />
      </RadioGroup>

      {values.step1?.needApproved === "false" ? (
        <Autocomplete
          name="step1.approvedPerson"
          onChange={updateApprovedPerson}
          value={values.step1?.approvedPerson || {}}
          options={listMember}
          getOptionLabel={(option) => option?.label ?? ""}
          defaultValue={initialValues.step1?.approvedPerson || {}}
          isOptionEqualToValue={(option, value) =>
            option?.id === value?.id || option?.label.toLowerCase() === value?.label?.toLowerCase()
          }
          error={touched.step1?.approvedPerson ? errors.step1?.approvedPerson : undefined}
          // helperText={touched.step1?.approvedPerson && errors.step1?.approvedPerson}
          sx={{ mb: "18px", mt: "10px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={values.step1?.approvedPerson?.label}
              label="Người phê duyệt"
              error={
                touched.step1?.approvedPerson?.label
                  ? errors.step1?.approvedPerson?.label
                  : undefined
              }
              helperText={
                touched.step1?.approvedPerson?.label && errors.step1?.approvedPerson?.label
              }
            />
          )}
        />
      ) : (
        <div></div>
      )}
      <Divider sx={{ my: "2rem" }} />
    </WizardStep>
  );
};

export default Step1;
