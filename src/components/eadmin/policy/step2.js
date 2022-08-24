import React from "react";

import {
  Autocomplete,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Dropzone from "@/components/eadmin/policy/droppzone";

import { attachments } from "@/mocks/attachments";
import { documentTypes } from "@/mocks/documentTypes";

import { useFormikContext } from "formik";
import * as Yup from "yup";

import WizardStep from "./step-common";
import { useContext } from "react";
import { Step2Context } from "./context/step2Context";
import Step2ContextProvider from "./context/step2Context";
import { useDropzone } from "react-dropzone";
// import "../css/dropzone.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export const Step2InitialValues = {
  step2: [],
};

export const Step2ValidationSchema = Yup.object({
  step2: Yup.array().of(
    Yup.object().shape({
      documentType: Yup.object({
        label: Yup.string().required("required"),
      }),
      fileName: Yup.string().required("required"),
      documentName: Yup.string().required("required"),
    })
  ),
});

const Step2 = () => {
  const { initialValues, values, touched, errors, handleChange, setFieldValue } =
    useFormikContext();

  // console.log({ values });
  let length = values.length - 1;

  const updateDocumentType = (selection, rowIndex) =>
    setFieldValue(
      `step2[${rowIndex}].documentType`,
      selection || {
        id: 0,
        label: "",
      }
    );

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, .doc, .xlsx, .pdf",
    uploadMultiple: true,
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setFieldValue(
        "step2",
        values.step2.concat(
          acceptedFiles.map((files) => ({
            fileName: files.path,
            documentName: files.name,
            documentType: {
              id: 0,
              label: "",
            },
          }))
        )
      );
    },
  });

  const handleDelete = (rowIndex) => {
    setFieldValue(
      "step2",
      values.step2.filter((_, index) => index !== rowIndex)
    );
  };

  return (
    <WizardStep
      onSubmit={() => console.log("Step1 onSubmit")}
      validationSchema={Step2ValidationSchema}
    >
      <Typography variant="h6" sx={{ mb: "1rem" }}>
        Văn bản đính kèm
      </Typography>

      {/* <Dropzone /> */}
      <Box
        {...getRootProps({ className: "dropzone" })}
        sx={{
          height: "121px",
          border: "1px dashed #bec0c2",
          borderWidth: "thin",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#efefef",
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ mt: "20px", fontSize: "30px" }} />
        <p className="dragFileText">
          Kéo file cần đính kèm vào đây để tải lên hoặc click vào để tải lên
        </p>
      </Box>

      <Table size="small" sx={{ mt: "2rem" }}>
        <TableHead>
          <TableRow>
            <TableCell>Tên file</TableCell>
            <TableCell>Loại tài liệu</TableCell>
            <TableCell>Tên tài liệu</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.step2 &&
            values.step2?.map((attachment, rowIndex) => (
              <TableRow hover key={rowIndex}>
                <TableCell width="250px">
                  <TextField
                    size="small"
                    name="step2.fileName"
                    value={attachment.fileName}
                    onChange={handleChange}
                    error={touched.step2?.fileName ? errors.step2?.fileName : undefined}
                    helperText={touched.step2?.fileName && errors.step2?.fileName}
                  />
                </TableCell>
                <TableCell width="300px">
                  <Autocomplete
                    name="step2.documentType"
                    options={documentTypes}
                    defaultValue={initialValues.step2?.documentType || {}}
                    size={"small"}
                    onChange={(_, selection) => updateDocumentType(selection, rowIndex)}
                    value={attachment?.documentType}
                    getOptionLabel={(option) => option?.label ?? ""}
                    isOptionEqualToValue={(option, value) =>
                      option?.id === value?.id ||
                      option?.label.toLowerCase() === value?.label?.toLowerCase()
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={values.step2?.documentType?.label}
                        error={
                          touched.step2 &&
                          touched.step2[rowIndex]?.documentType?.label &&
                          errors.step2
                            ? errors.step2[rowIndex]?.documentType?.label
                            : undefined
                        }
                        helperText={
                          touched.step2 &&
                          touched.step2[rowIndex]?.documentType?.label &&
                          errors.step2 &&
                          errors.step2[rowIndex]?.documentType?.label
                        }
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="step2.documentName"
                    size="small"
                    fullWidth
                    value={attachment?.documentName.split(".").slice(0, -1).join(".")}
                    onChange={handleChange}
                    error={touched.step2?.documentName ? errors.step2?.documentName : undefined}
                    helperText={touched.step2?.documentName && errors.step2?.documentName}
                  />
                </TableCell>
                <TableCell width="30px" padding="none">
                  <DeleteIcon onClick={() => handleDelete(rowIndex)} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Divider sx={{ my: "2rem" }} />
    </WizardStep>
  );
};

export default Step2;
