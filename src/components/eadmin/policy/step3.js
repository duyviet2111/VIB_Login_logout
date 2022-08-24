import React from "react";

import { Typography, Box, Divider } from "@mui/material";

import Stepper from "@/components/eadmin/policy/stepper";
import { personAgreeList, personVerifyList } from "@/mocks/members";
import { useFormikContext } from "formik";
import * as Yup from "yup";

import WizardStep from "./step-common";
import PersonSelector from "./select-person";

export const Step3InitialValues = {
  step3: {
    verifyPersons: [],
    approvedPersons: [],
  },
};

export const Step3ValidationSchema = Yup.object({
  step3: Yup.object().shape({
    verifyPersons: Yup.array()
      .min(1, "required")
      .of(
        Yup.object({
          label: Yup.string().required("required"),
        }).required("required")
      ),
    approvedPersons: Yup.array()
      .min(1, "required")
      .of(
        Yup.object({
          label: Yup.string().required("required"),
        }).required("required")
      ),
  }),
});

const Step3 = () => {
  const { values, touched, errors, setFieldValue } = useFormikContext();

  const updateVerifyPersons = (selection) => setFieldValue("step3.verifyPersons", selection);
  const updateApprovedPersons = (selection) => setFieldValue("step3.approvedPersons", selection);

  const steps = [
    {
      name: "Khởi tạo",
      component: () => (
        <span className="row2">
          <Typography>Nhữ Tuấn Anh | BTS-CTS</Typography>
        </span>
      ),
    },
    {
      name: "Thẩm định",
      component: () => (
        <PersonSelector
          name="step3.verifyPersons"
          placeholder="Người thẩm định"
          options={personVerifyList}
          currentSelections={values.step3.verifyPersons}
          onChange={updateVerifyPersons}
          error={touched.step3?.verifyPersons && Boolean(errors.step3?.verifyPersons)}
          helperText={touched.step3?.verifyPersons && errors.step3?.verifyPersons}
        />
      ),
    },
    {
      name: "Phê duyệt",
      component: () => (
        <PersonSelector
          name="step3.approvedPersons"
          placeholder="Người phê duyệt"
          options={personAgreeList}
          currentSelections={values.step3.approvedPersons}
          onChange={updateApprovedPersons}
          error={touched.step3?.approvedPersons && Boolean(errors.step3?.approvedPersons)}
          helperText={touched.step3?.approvedPersons && errors.step3?.approvedPersons}
        />
      ),
    },
    { name: "Văn thư" },
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

        <Divider sx={{ my: "2rem" }} />
      </Box>
    </WizardStep>
  );
};

export default Step3;
