import { DashboardLayout } from "@/components/dashboard-layout";
import BorrowAdditionalContextProvider, {
  BorrowAdditionalContext,
} from "@/components/eadmin/policy/context/borrowAdditional";
import { Debug } from "@/components/eadmin/policy/formik-debug";
import SelectCoverNumber from "@/components/qlhs/rm/add-card-selectCoverNumber";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Container, Divider, Modal, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Head from "next/head";
import React, { useContext, useState, useEffect } from "react";
import {
  createFormTypesInitialValues,
  createFormTypesValidationSchema,
  QlhsCreateForm,
} from "../../../components/qlhs/qlhs-create-form";
import Link from "next/link";
import Print from "@/components/qlhs/utils/print";
import { rmApi } from "@/__api__/rm/rmApi";
import ShowErrorCode from "@/components/qlhs/utils/showError";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Wizard = ({
  children,
  initialValues,
  onSubmit,
  stepNumber,
  setStepNumber,
  submitSuccess,
  setSubmitSuccess,
  message,
  error,
  open,
  setOpen,
}) => {
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);
  const [rmCard, setRmCard] = useState(false);
  // const [open, setOpen] = React.useState(false);
  console.log("submitSuccess", submitSuccess);

  const { openModal, setOpenModal, selectedRecord } = useContext(BorrowAdditionalContext);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user.role.toLowerCase() == "rmcard") {
      setRmCard(true);
    }
  }, []);

  const previous = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "15px",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Link href="/qlhs/rm" passHref>
                <Button startIcon={<ArrowBackIosIcon />} variant="outlined">
                  Trở về
                </Button>
              </Link>
            </Box>
            <Box>
              {!submitSuccess ? (
                <Stack direction="row" spacing={2}>
                  {rmCard ? (
                    <div>
                      <Button onClick={handleOpen} variant="contained" color="vib">
                        Xác nhận
                      </Button>
                      <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Gán số bìa hồ sơ
                          </Typography>
                          <SelectCoverNumber
                            handleSubmit={handleSubmit}
                            setSubmitSuccess={setSubmitSuccess}
                          />
                        </Box>
                      </Modal>
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      color="vib"
                      endIcon={<SendIcon />}
                      disabled={formik.isSubmitting}
                      type="submit"
                    >
                      {isLastStep ? "Gửi" : "Tiếp tục"}
                    </Button>
                  )}
                </Stack>
              ) : (
                <Print selectedRecord={selectedRecord} rmCard={rmCard} />
              )}
              {error && <ShowErrorCode message={message} open={open} setOpen={setOpen} />}
            </Box>
          </Box>
          {/* {process.env.NODE_ENV !== "production" && <Debug />} */}
        </Form>
      )}
    </Formik>
  );
};

const QlhsCreate = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const SubmitApi = async (data) => {
    const res = await rmApi.getConfirmSubmitSuccess(data);
    if (res.status == 200) {
      setSubmitSuccess(true);
    } else {
      setError(true);
      setMessage(res.message);
      setOpen(true);
    }
  };

  const handleSubmitForm = async (values) => {
    const data = values?.formGroup.items.map((el) => ({
      id: el.id,
      detailRecord: el.detailRecord,
    }));

    const value = { productId: values?.formGroup.productId, data, numOfCover: values?.numOfCover };
    SubmitApi(value);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mb: "2rem" }}>
        <Wizard
          initialValues={{
            ...createFormTypesInitialValues,
          }}
          onSubmit={handleSubmitForm}
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
          submitSuccess={submitSuccess}
          setSubmitSuccess={setSubmitSuccess}
          error={error}
          message={message}
          open={open}
          setOpen={setOpen}
        >
          <QlhsCreateForm validationSchema={createFormTypesValidationSchema} />
        </Wizard>
      </Container>
    </>
  );
};

QlhsCreate.getLayout = (page) => (
  <BorrowAdditionalContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </BorrowAdditionalContextProvider>
);

export default QlhsCreate;
