import React from "react";
import { useDropzone } from "react-dropzone";
// import "../css/dropzone.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/material";
import { useContext } from "react";
import { Step2Context } from "./context/step2Context";
import { useEffect, useState } from "react";

const Dropzone = (props) => {
  const { setFileAttachment } = useContext(Step2Context);
  const [files, setFiles] = useState(false);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, .doc, .xlsx, .pdf",
    onDrop: (acceptedFiles) => {
      setFileAttachment(acceptedFiles.map((file) => ({ file: file.path, fileName: file.name })));
    },
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      {/* <Box
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
      </Box> */}
      <aside>
        {/* <ul>
          {acceptedFileItems.map((files, index) => (
            <li key={index}>{files}</li>
          ))}
        </ul> */}
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
};

export default Dropzone;
