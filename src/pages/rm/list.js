import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Card, Divider, Grid, TextField, Typography, Button, Container } from "@mui/material";
import { CustomerListResults } from "../../components/qlhs/qlhs-list-results";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Plus as PlusIcon } from "../../icons/plus";
import BorrowAdditionalContextProvider, {
  BorrowAdditionalContext,
} from "../../components/eadmin/policy/context/borrowAdditional";

const Customers = () => {
  const [borrowAdditional, setBorrowAdditional] = useState(true);
  const { setAttachedCover } = useContext(BorrowAdditionalContext);

  useEffect(() => {
    setAttachedCover("");
  }, []);

  return (
    <>
      <Head>
        <title>Danh mục hồ sơ cần xử lý</title>
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
                <Typography variant="h4">Danh mục hồ sơ cần xử lý</Typography>
              </Grid>
              <Grid item>
                <NextLink href="/qlhs/rm/borrow" passHref>
                  <Button startIcon={<PlusIcon fontSize="small" />} variant="contained">
                    Tạo đề nghị mượn
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <Divider />
            <CustomerListResults
              setBorrowAdditional={setBorrowAdditional}
              borrowAdditional={borrowAdditional}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Customers.getLayout = (page) => (
  <BorrowAdditionalContextProvider>
    <DashboardLayout>{page}</DashboardLayout>
  </BorrowAdditionalContextProvider>
);

export default Customers;
