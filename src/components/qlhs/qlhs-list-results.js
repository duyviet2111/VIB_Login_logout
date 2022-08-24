import { useContext, useEffect, useState, useCallback } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { format } from "date-fns";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Divider,
} from "@mui/material";
import { BorrowAdditionalContext } from "../eadmin/policy/context/borrowAdditional";
import { useRouter } from "next/router";
import { qlhsApi } from "../../__api__/qlhs-api";
import { useMounted } from "src/hooks/use-mounted";
const logger = require("pino")();

export const listRecords = {
  records: [],
};

export const CustomerListResults = (props) => {
  const { setBorrowAdditional, borrowAdditional, ...rest } = props;
  const [page, setPage] = useState(1);
  const isMounted = useMounted();
  const [customers, setQlhs] = useState({ items: [], currentPage: 0, totalPage: 0 });
  const { setSelectedRecord } = useContext(BorrowAdditionalContext);
  const router = useRouter();

  const getQlhs = useCallback(
    async (page) => {
      try {
        const data = await qlhsApi.getQlhs(page);

        if (isMounted()) {
          setQlhs(data);
        }
      } catch (err) {
        logger.error(err);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    getQlhs(page);
  }, [page]);

  const handleSelectOne = (event, customer) => {
    setSelectedRecord(customer);

    if (customer.reqType == "Lưu mới") {
      router.push("/qlhs/rm/add");
    }
    if (customer.reqType == "Mượn để bổ sung") router.push("/qlhs/rm/brmore");
    if (customer.reqType == "Hoàn trả/Gia hạn") router.push("/qlhs/rm/return");
  };

  const handleChange = (event, value) => {
    getQlhs(value);
    setPage(value);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Số HĐ/Số LOS</TableCell>
                <TableCell>CIF</TableCell>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Loại yêu cầu</TableCell>
                <TableCell>Ngày thực hiện</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.items.map((customer) => {
                return (
                  <TableRow
                    hover
                    key={customer.id}
                    onClick={(event) => handleSelectOne(event, customer)}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>{customer.contractNo}</TableCell>
                    <TableCell>{customer.cifNo}</TableCell>
                    <TableCell>{customer.fullname}</TableCell>
                    <TableCell>{customer.reqType}</TableCell>
                    <TableCell>{format(customer.createdAt, "dd/MM/yyyy")}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Divider sx={{ my: 2 }} />
      <Pagination
        hidePrevButton
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: 0,
          },
        }}
        count={customers.totalPage}
        page={customers.currentPage ? customers.currentPage : page}
        onChange={handleChange}
        sx={{ my: 2 }}
      />
    </Card>
  );
};
