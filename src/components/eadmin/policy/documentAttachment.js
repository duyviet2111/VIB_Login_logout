import {
  Box,
  Link,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

// import { attachments } from "@/mocks/attachments";

const DocumentAttachment = ({ values, stepNumber }) => {
  return (
    <Box
      sx={{
        mt: "10px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography align="left" variant="h6" className="step4-typography">
          Văn bản đính kèm
        </Typography>
        <div>
          <EditIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              stepNumber(1);
            }}
          />
        </div>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tên file</TableCell>
            <TableCell>Loại tài liệu</TableCell>
            <TableCell>Tên tài liệu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.step2.map((attachment) => (
            <TableRow hover key={attachment.fileName}>
              <TableCell width="250px">
                <Link href="#">{attachment.documentName}</Link>
              </TableCell>
              <TableCell width="300px">{attachment.documentType.label}</TableCell>
              <TableCell>{attachment.fileName.split(".").slice(0, -1).join(".")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DocumentAttachment;
