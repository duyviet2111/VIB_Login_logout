import React from "react";

import { Divider } from "@mui/material";

import DocumentInfomation from "./documentInfomation";
import DocumentAttachment from "./documentAttachment";
import ConfirmProcess from "./confirmProcess";
import { useFormikContext } from "formik";

const Step4 = ({ stepNumber }) => {
  const { values } = useFormikContext();

  return (
    <>
      <DocumentInfomation values={values} stepNumber={stepNumber} />

      <Divider sx={{ my: "2rem" }} />

      <DocumentAttachment values={values} stepNumber={stepNumber} />

      <Divider sx={{ my: "2rem" }} />

      <ConfirmProcess values={values} />

      <Divider sx={{ my: "2rem" }} />
    </>
  );
};

export default Step4;
