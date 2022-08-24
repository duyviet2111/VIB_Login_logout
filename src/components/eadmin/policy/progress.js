import React from "react";
import Stepper from "./stepper";

const steps = [
  {
    name: "Step1",
  },
  {
    name: "Step2",
  },
  {
    name: "Step3",
  },
  { name: "Step4" },
];

const Progress = ({ activeStep }) => {
  return (
    <>
      <Stepper activeStep={activeStep} steps={steps} />
    </>
  );
};

export default Progress;
