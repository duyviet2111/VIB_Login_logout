import { DashboardLayout } from "@/components/dashboard-layout";
import { Debug } from "@/components/eadmin/policy/formik-debug";
import BorrowStep1, { recordsSelectedInitialValues } from "@/components/qlhs/rm/borrow-step1";
import BorrowStep2, {
  BorrowStep2InitialValue,
  BorrowStep2ValidateioSchema,
} from "@/components/qlhs/rm/borrow-step2";
import BorrowContextProvider, { BorrowContext } from "@/components/qlhs/rm/context/borrow";
import ConfirmProcess from "@/components/qlhs/utils/confirmProcess";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Container, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import Head from "next/head";
import React, { useContext, useState } from "react";
// import { selectPersoninitialValue } from "../../../components/qlhs/utils/confirmProcess";
import {
  approveFormInitailValues,
  approveFormValidationSchema,
} from "../../../components/qlhs/utils/confirmProcess";
import Link from "next/link";
import { useRouter } from "next/router";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Wizard = ({ children, initialValues, onSubmit, stepNumber, setStepNumber }) => {
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);
  const router = useRouter();

  const { borrowSelected } = useContext(BorrowContext);

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
      router.push("/qlhs/rm/handling");
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  const preventEnterSubmit = (e) => e.key === "Enter" && e.preventDefault();

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form onKeyDown={preventEnterSubmit}>
          <Head>
            <title>Mượn Hồ Sơ</title>
          </Head>
          {step}
          {/* <Divider sx={{ my: "2rem" }} /> */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "15px" }}>
            <Box sx={{ display: "flex" }}>
              {stepNumber == 0 ? (
                <Link href="/qlhs/rm" passHref>
                  <Button startIcon={<ArrowBackIosIcon />} variant="outlined">
                    Trở về
                  </Button>
                </Link>
              ) : (
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  // disabled={isSubmitting}
                  variant="outlined"
                  onClick={() => previous(formik.values)}
                >
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
                  // disabled={formik.isSubmitting}
                  type="submit"
                  disabled={!borrowSelected.length ? true : formik.isSubmitting}
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

const BorrowRecords = () => {
  const [stepNumber, setStepNumber] = useState(0);

  const sendDataToBE = async (values) => {
    const data = {
      recordsSelected: values.recordsSelected,
      date: values.step1.date,
      note: values.step1.note,
      approveForm: values.approveForm,
    };
    console.log("data", data);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mb: "2rem" }}>
        <Wizard
          initialValues={{
            ...recordsSelectedInitialValues,
            ...BorrowStep2InitialValue,
            ...approveFormInitailValues,
          }}
          onSubmit={(values) => sendDataToBE(values)}
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
        >
          <BorrowStep1 />
          <BorrowStep2 validationSchema={BorrowStep2ValidateioSchema} />
          <ConfirmProcess validationSchema={approveFormValidationSchema} />
        </Wizard>
      </Container>
    </>
  );
};

BorrowRecords.getLayout = (page) => (
  <DashboardLayout>
    <BorrowContextProvider>{page}</BorrowContextProvider>
  </DashboardLayout>
);

export default BorrowRecords;
