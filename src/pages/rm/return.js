import React, { useState, useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import { Debug } from "@/components/eadmin/policy/formik-debug";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Box, Button, Container, Stack, Grid, Typography, Divider, Modal } from "@mui/material";
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
import ReturnCommon from "@/components/qlhs/rm/returnCommon";
import ExtendPage from "@/components/qlhs/rm/extend";
import ConfirmProcess from "@/components/qlhs/utils/confirmProcess";
import BorrowAdditionalContextProvider, {
  BorrowAdditionalContext,
} from "@/components/eadmin/policy/context/borrowAdditional";
import {
  ExtendInitialValue,
  ExtendValidateioSchema,
} from "@/components/qlhs/rm/extend-date-confirm";
import ReturnContextProvider from "@/components/qlhs/rm/context/returnAndExtend";
import { ReturnInitialValues } from "@/components/qlhs/rm/returnRecord";
import { ReturnAndExtendContext } from "@/components/qlhs/rm/context/returnAndExtend";
import SelectCoverNumber from "@/components/qlhs/rm/add-card-selectCoverNumber";
import Link from "next/link";

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
const Wizard = ({ children, initialValues, onSubmit, stepNumber, setStepNumber, selected }) => {
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);
  const [rmCard, setRmCard] = useState(false);

  const { openModal, setOpenModal } = useContext(BorrowAdditionalContext);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user.role.toLowerCase() == "rmcard") {
      setRmCard(true);
    }
  }, []);

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
            <title>Hoàn trả và Gia hạn</title>
          </Head>
          {step}
          <Divider sx={{ my: "2rem" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "15px" }}>
            <Box sx={{ display: "flex" }}>
              {stepNumber == 0 ? (
                <Link href="/qlhs/rm" passHref>
                  <Button variant="outlined" color="primary">
                    Trở về{" "}
                  </Button>
                </Link>
              ) : (
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  variant="outlined"
                  color="primary"
                  onClick={() => previous(formik.values)}
                >
                  {" "}
                  Trở về
                </Button>
              )}
            </Box>
            <Box>
              <Stack direction="row" spacing={2}>
                {selected == "Hoàn trả" &&
                  (rmCard ? (
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
                          <SelectCoverNumber handleSubmit={handleSubmit} />
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
                  ))}
                {selected == "Gia hạn" && (
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
            </Box>
          </Box>
          {/* {process.env.NODE_ENV !== "production" && <Debug />} */}
        </Form>
      )}
    </Formik>
  );
};

const ReturnPage = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const [extend, setExtend] = useState(false);
  const { selected } = useContext(ReturnAndExtendContext);

  const schema = selected == "Hoàn trả" ? createFormTypesValidationSchema : ExtendValidateioSchema;

  const handleSubmitForm = async (values) => {
    sleep(300).then(() => {
      console.log("Wizard submit", values);
      alert("Summit data: " + JSON.stringify(values));
    });
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mb: "2rem" }}>
        <Wizard
          initialValues={{
            ...ExtendInitialValue,
            ...approveFormInitailValues,
            ...createFormTypesInitialValues,
            // ...Step3InitialValues,
          }}
          onSubmit={handleSubmitForm}
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
          selected={selected}
        >
          <ReturnCommon validationSchema={schema} setExtend={setExtend} />
          {selected == "Gia hạn" && (
            <ConfirmProcess selected={selected} validationSchema={approveFormValidationSchema} />
          )}
        </Wizard>
      </Container>
    </>
  );
};

ReturnPage.getLayout = (page) => (
  <BorrowAdditionalContextProvider>
    <ReturnContextProvider>
      <DashboardLayout>{page}</DashboardLayout>
    </ReturnContextProvider>
  </BorrowAdditionalContextProvider>
);

export default ReturnPage;
