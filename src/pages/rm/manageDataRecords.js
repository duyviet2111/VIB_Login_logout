import { DashboardLayout } from "@/components/dashboard-layout";
import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Divider,
  Button,
} from "@mui/material";

import { manageDataRecords } from "@/mocks/manageDataRecords";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NextLink from "next/link";
import { rmApi } from "@/__api__/rm/rmApi";
import ManageContextProvider, { ManageContext } from "@/components/qlhs/rm/context/manage";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&": {
    padding: "0px 16px",
    width: "25%",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&": {
    height: 30,
  },
}));

const ManageDataRecords = () => {
  const [data, setData] = useState({});
  const { manageRecords } = useContext(ManageContext);
  const fetchApi = async () => {
    const res = await rmApi.getInforRecord(manageRecords);
    if (res.status == 200) {
      setData(res.value);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h5">Thông tin hồ sơ</Typography>

        <Table sx={{ display: "flex" }}>
          <TableBody sx={{ width: "50%" }}>
            {data.col1 ? (
              <>
                <StyledTableRow>
                  <StyledTableCell>Số HĐTĐ/Số LOS</StyledTableCell>
                  <StyledTableCell>{data.col1.numOfLOS}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Số bìa</StyledTableCell>
                  <StyledTableCell>{data.col1.numOfCover}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Số thùng</StyledTableCell>
                  <StyledTableCell>{data.col1.numOfBox}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Số CIF</StyledTableCell>
                  <StyledTableCell>{data.col1.numOfCIF}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Số seal hồ sơ</StyledTableCell>
                  <StyledTableCell>{data.col1.numOfSeal}</StyledTableCell>
                </StyledTableRow>
              </>
            ) : (
              <StyledTableRow></StyledTableRow>
            )}
          </TableBody>
          <TableBody sx={{ width: "50%" }}>
            {data?.col2 ? (
              <>
                <StyledTableRow>
                  <StyledTableCell>Trạng thái hồ sơ</StyledTableCell>
                  <StyledTableCell>{data.col2.status}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Họ và tên khách hàng</StyledTableCell>
                  <StyledTableCell>{data.col2.CustomerName}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Số seal hồ sơ</StyledTableCell>
                  <StyledTableCell>{data.col2.numOfSeal}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Số seal thùng 1</StyledTableCell>
                  <StyledTableCell>{data.col2.numOfBox1}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>CBQL hồ sơ</StyledTableCell>
                  <StyledTableCell>{data.col2.memberManagement}</StyledTableCell>
                </StyledTableRow>
              </>
            ) : (
              <StyledTableRow></StyledTableRow>
            )}
          </TableBody>
        </Table>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Quá trình hồ sơ</Typography>
        </Box>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thời gian</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Người yêu cầu</TableCell>
                <TableCell>Người phê duyệt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.processOfRecords?.map((data) => (
                <StyledTableRow key={data.id}>
                  <StyledTableCell>{data.time}</StyledTableCell>
                  <StyledTableCell>{data.status}</StyledTableCell>
                  <StyledTableCell>{data.requirePerson}</StyledTableCell>
                  <StyledTableCell>{data.approvePerson}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Divider sx={{ my: "2rem" }} />
        <NextLink href="/qlhs/rm/manage">
          <Button startIcon={<ArrowBackIosIcon />} variant="outlined">
            Trở về
          </Button>
        </NextLink>
      </Container>
    </Box>
  );
};

ManageDataRecords.getLayout = (page) => (
  <ManageContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </ManageContextProvider>
);

export default ManageDataRecords;
