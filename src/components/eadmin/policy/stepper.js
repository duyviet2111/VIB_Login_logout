import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function Progress({ steps = [], activeStep }) {
  return (
    <Box sx={{ mt: "50px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.name}>
            <div style={{ position: "relative" }}>
              <StepLabel>
                <span
                  style={{
                    position: "absolute",
                    top: "-32px",
                    width: "93px",
                    left: `${steps.length == 4 ? "81px" : steps.length == 2 ? "201px" : "119px"}`,
                    // 81
                  }}
                >
                  {step.name}
                </span>
                {step.component && <step.component />}
              </StepLabel>
            </div>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
