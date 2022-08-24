import React, { useState, useContext } from "react";

import { Form, Formik } from "formik";
import { Debug } from "@/components/eadmin/policy/formik-debug";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Box, Button, Container, Stack, Grid, Typography, Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import Head from "next/head";
import AddConfirm, {
  approveFormInitailValues,
  approveFormValidationSchema,
} from "@/components/qlhs/rm/add-confirm";
import BrmoreStep1, {
  BorrowStep1InitialValue,
  BorrowStep1ValidateioSchema,
} from "@/components/qlhs/rm/brmore-step1";
import BorrowAdditionalContextProvider from "@/components/eadmin/policy/context/borrowAdditional";
import ConfirmProcess from "@/components/qlhs/utils/confirmProcess";
import Link from "next/link";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Wizard = ({ children, initialValues, onSubmit, stepNumber, setStepNumber }) => {
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
            <title>Mượn bổ sung</title>
          </Head>
          {step}
          <Divider sx={{ my: "2rem" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "15px" }}>
            <Box sx={{ display: "flex" }}>
              {stepNumber == 0 ? (
                <Link href="/qlhs/rm" passHref>
                  <Button variant="outlined">Trở về </Button>
                </Link>
              ) : (
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  variant="outlined"
                  onClick={() => previous(formik.values)}
                >
                  {" "}
                  Trở về
                </Button>
              )}
            </Box>
            <Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="vib"
                  endIcon={<SendIcon />}
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  {isLastStep ? "Gửi" : "Tiếp tục"}
                </Button>
              </Stack>
            </Box>
          </Box>
          {/* {process.env.NODE_ENV !== "production" && <Debug />} */}
        </Form>
      )}
    </Formik>
  );
};

const BorrowAdditional = () => {
  const [stepNumber, setStepNumber] = useState(0);

  return (
    <>
      <Container maxWidth="xl" sx={{ mb: "2rem" }}>
        <Wizard
          initialValues={{
            ...BorrowStep1InitialValue,
            ...approveFormInitailValues,
            // ...Step3InitialValues,
          }}
          onSubmit={async (values) =>
            sleep(300).then(() => {
              console.log("Wizard submit", values);
              alert("Summit data: " + JSON.stringify(values));
            })
          }
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
        >
          <BrmoreStep1 validationSchema={BorrowStep1ValidateioSchema} />
          <ConfirmProcess validationSchema={approveFormValidationSchema} />
        </Wizard>
      </Container>
    </>
  );
};

BorrowAdditional.getLayout = (page) => (
  <BorrowAdditionalContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </BorrowAdditionalContextProvider>
);

export default BorrowAdditional;
