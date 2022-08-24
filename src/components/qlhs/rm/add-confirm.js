import React from "react";

import { Typography, Box, Divider } from "@mui/material";

import Stepper from "@/components/eadmin/policy/stepper";
import { personAgreeList, personVerifyList } from "@/mocks/members";
import { useFormikContext } from "formik";
import * as Yup from "yup";

import WizardStep from "../../../components/eadmin/policy/step-common";
import PersonSelector from "../../../components/eadmin/policy/select-person";

export const approveFormInitailValues = {
  approveForm: {
    approvedPersons: [],
  },
};

export const approveFormValidationSchema = Yup.object({
  approveForm: Yup.object().shape({
    approvedPersons: Yup.array()
      .min(1, "required")
      .of(
        Yup.object({
          label: Yup.string().required("required"),
        }).required("required")
      ),
  }),
});

const AddConfirm = () => {
  const { values, touched, errors, setFieldValue } = useFormikContext();

  const updateApprovedPersons = (selection) =>
    setFieldValue("approveForm.approvedPersons", selection);

  const steps = [
    {
      name: "Khởi tạo",
      component: () => (
        <span className="row2">
          <Typography>Trần Văn Anh | VIB Quận 1</Typography>
        </span>
      ),
    },
    {
      name: "Phê duyệt",
      component: () => (
        <PersonSelector
          name="approveForm.approvedPersons"
          placeholder="Người phê duyệt"
          options={personAgreeList}
          currentSelections={values.approveForm?.approvedPersons}
          onChange={updateApprovedPersons}
          error={
            touched.approveForm?.approvedPersons && Boolean(errors.approveForm?.approvedPersons)
          }
          helperText={touched.approveForm?.approvedPersons && errors.approveForm?.approvedPersons}
        />
      ),
    },
    {
      name: "Lưu trữ",
      component: () => (
        <span className="row2">
          <Typography>Nguyễn Ngọc Hà | VIB Quận 1</Typography>
        </span>
      ),
    },
  ];

  return (
    <WizardStep>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mt: "50px",
        }}
      >
        <Box>
          <Typography variant="h6">Quy trình phê duyệt</Typography>
        </Box>

        <Stepper steps={steps} />
      </Box>
    </WizardStep>
  );
};

export default AddConfirm;
