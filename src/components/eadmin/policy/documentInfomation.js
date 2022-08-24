import React from "react";
import Box from "@mui/material/Box";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const DocumentInfomation = ({ values, stepNumber }) => {
  const descriptions = [
    {
      id: 2,
      name: "Tên văn bản",
      value: values.step1.documentName,
    },
    {
      id: 3,
      name: "Loại văn bản",
      value: values.step1.documentType.label,
    },
    {
      id: 6,
      name: "Trình phê duyệt",
      value: values.step1.needApproved ? "Có" : "Không",
    },
    {
      id: 7,
      name: "Người phê duyệt",
      value: values.step1.approvedPerson.label,
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography align="left" variant="h6" className="step4-typography">
          Thông tin văn bản
        </Typography>
        <div>
          <EditIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              stepNumber(0);
            }}
          />
        </div>
      </Box>

      <Table size="small">
        <TableBody>
          {descriptions.map((desc) => (
            <TableRow key={desc.id}>
              <TableCell width="250px">{desc.name}</TableCell>
              <TableCell>{desc.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DocumentInfomation;
