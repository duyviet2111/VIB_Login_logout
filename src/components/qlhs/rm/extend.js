import React, { useState, useContext } from "react";

import { Form, Formik } from "formik";
import { Debug } from "@/components/eadmin/policy/formik-debug";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Box, Button, Container, Stack, Grid, Typography, Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import Head from "next/head";
import { qlhsApi } from "../../../__api__/qlhs-api";
import {
  createFormTypesInitialValues,
  createFormTypesValidationSchema,
  QlhsCreateForm,
} from "../../../components/qlhs/qlhs-create-form";
//import { customers } from '../../../__mocks__/qlhs-list-hoso';
import { Search as SearchIcon } from "../../../icons/search";
import { Plus as PlusIcon } from "../../../icons/plus";
import { useMounted } from "src/hooks/use-mounted";
import { Upload as UploadIcon } from "../../../icons/upload";
import AddConfirm, {
  approveFormInitailValues,
  approveFormValidationSchema,
} from "@/components/qlhs/rm/add-confirm";
import ExtendStep1 from "./extend-step1";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Wizard = ({
  children,
  initialValues,
  onSubmit,
  stepNumber,
  setStepNumber,
  submitSuccess,
}) => {
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    // console.log("submit of step", stepNumber, step.type.name);
    // console.log("validate", step.props, step.props.validationSchema, step);
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          <Head>
            <title>Tạo Hồ Sơ</title>
          </Head>
          {step}
          <Divider sx={{ my: "2rem" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "15px" }}>
            <Box sx={{ display: "flex" }}>
              {stepNumber >= 0 && (
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => previous(formik.values)}
                >
                  {" "}
                  Trở về
                </Button>
              )}
            </Box>
            <Box>
              {!submitSuccess && (
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={formik.isSubmitting}
                    type="submit"
                  >
                    {isLastStep ? "Gửi" : "Tiếp tục"}
                  </Button>
                </Stack>
              )}
            </Box>
          </Box>
          {/* {process.env.NODE_ENV !== "production" && <Debug />} */}
        </Form>
      )}
    </Formik>
  );
};

const ExtendPage = ({ checked }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitForm = async (values) => {
    sleep(300).then(() => {
      console.log("Wizard submit", values);
      alert("Summit data: " + JSON.stringify(values));
    });
    setSubmitSuccess(true);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mb: "2rem" }}>
        <Wizard
          initialValues={{
            ...createFormTypesInitialValues,
            ...approveFormInitailValues,
            // ...Step3InitialValues,
          }}
          onSubmit={handleSubmitForm}
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
          submitSuccess={submitSuccess}
        >
          <ExtendStep1 checked={checked} />
        </Wizard>
      </Container>
    </>
  );
};

ExtendPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ExtendPage;
