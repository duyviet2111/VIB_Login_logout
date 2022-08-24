import ManageContextProvider, { ManageContext } from "@/components/qlhs/rm/context/manage";
import { listData } from "@/mocks/managePageData";
import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Pagination,
  TableRow,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
//import { CustomerListToolbar } from '../../../components/qlhs/qlhs-list-tollbar';
import { DashboardLayout } from "../../../components/dashboard-layout";
import { rmApi } from "@/__api__/rm/rmApi";

const logger = require("pino")();

const ManagePage = () => {
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState({});
  const { setManageRecords } = useContext(ManageContext);

  const fetchApi = async (page) => {
    const res = await rmApi.getManagesData(page);
    if (res.status == 200) {
      setData(res);
    }
  };

  useEffect(() => {
    fetchApi(page);
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const router = useRouter();

  const handleManageData = (data) => {
    setManageRecords(data);
    router.push("/qlhs/rm/manageDataRecords");
  };

  return (
    <>
      <Head>
        <title>Quản trị hồ sơ</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Quản trị hồ sơ</Typography>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Số HĐTĐ</TableCell>
                  <TableCell>Số CIF</TableCell>
                  <TableCell>Loại hồ sơ</TableCell>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.items?.map((data) => (
                  <TableRow
                    key={data.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleManageData(data)}
                  >
                    <TableCell>{data.numOfHDTD}</TableCell>
                    <TableCell>{data.numOfCIF}</TableCell>
                    <TableCell>{data.recordType}</TableCell>
                    <TableCell>{data.fullname}</TableCell>
                    <TableCell>{data.recordStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <Stack spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Pagination
              count={data.totalPage}
              page={data.currentPage ? data.currentPage : page}
              onChange={handleChangePage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

ManagePage.getLayout = (page) => (
  <ManageContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </ManageContextProvider>
);

export default ManagePage;
