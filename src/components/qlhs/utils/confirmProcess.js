import React, { useContext, useEffect, useState } from "react";

import { Typography, Box, Divider } from "@mui/material";

import Stepper from "@/components/eadmin/policy/stepper";
import { personVerifyList } from "@/mocks/members";
import { useFormikContext } from "formik";
import * as Yup from "yup";

import WizardStep from "../../../components/eadmin/policy/step-common";
import PersonSelector from "../../../components/eadmin/policy/select-person";
import { commonApi } from "../../../__api__/common-api";
import { rmApi } from "@/__api__/rm/rmApi";

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

const ConfirmProcess = (props) => {
  const { values, touched, errors, setFieldValue } = useFormikContext();
  const [personAgreeList, setPersonAgreeList] = useState([]);
  const [memberName, setMemberName] = useState({});

  const updateApprovedPersons = (selection) =>
    setFieldValue("approveForm.approvedPersons", selection);

  const fetchApi = async () => {
    return commonApi.getAllEmployeesWithMoreInfo();
  };

  const fetchStepApi = async () => {
    const res = await rmApi.getStepsName();
    if (res.status == 200) {
      setMemberName(res.data);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchApi();
      setPersonAgreeList(data);
    };
    fetch();
    fetchStepApi();
  }, []);

  const normalSteps = [
    {
      name: "Khởi tạo",
      component: () => (
        <span className="row2">
          <Typography>{memberName.initialMember}</Typography>
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
          <Typography>{memberName.saveMember}</Typography>
        </span>
      ),
    },
  ];

  const extendStep = [
    {
      name: "Khởi tạo",
      component: () => (
        <span className="row2">
          <Typography>{memberName.initialMember}</Typography>
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
  ];

  const steps = props.selected === "Gia hạn" ? extendStep : normalSteps;

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

export default ConfirmProcess;
