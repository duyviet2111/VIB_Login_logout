import { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { NavItem } from "./nav-item";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { TextBox as TextBoxIcon } from "../icons/text-box";
import { userApi } from "src/__api__/user";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";

const RM = {
  title: "Menu",
  items: [
    {
      title: "DANH MỤC HỒ SƠ",
      path: "/qlhs/rm",
      children: [
        {
          title: "Cần xử lý",
          path: "/qlhs/rm/list",
          icon: <AccessTimeIcon fontSize="small" />,
        },
        {
          title: "Đang xử lý",
          path: "/qlhs/rm/handling",
          icon: <HistoryToggleOffIcon fontSize="small" />,
        },
        {
          title: "Quản trị hồ sơ",
          path: "/qlhs/rm/manage",
          icon: <SummarizeIcon fontSize="small" />,
        },
      ],
    },
  ],
};

const getSection = () => {
  const sections = [
    {
      title: "Policy",
      items: [
        {
          title: "Vản bản",
          path: "/eadmin/policy",
          icon: <TextBoxIcon fontSize="small" />,
          children: [
            {
              title: "Hành chính công văn",
              path: "/eadmin/policy",
            },
          ],
        },
      ],
    },
  ];

  const fetchApi = async () => {
    const res = await userApi.getUser();
    if (res.status == 200) {
      sessionStorage.setItem("user", JSON.stringify(res.user));
      if (res.user.role.toLowerCase() == "rm") {
        return [RM];
      }
      if (res.user.role.toLowerCase() == "rmcard") {
        return [RM];
      }
    }
  };
  return fetchApi();
};
export const activeMenuItemMap = new Map([
  // RM
  ["/qlhs/rm/list", "/qlhs/rm/list"],
  ["/qlhs/rm/add", "/qlhs/rm/list"],
  ["/qlhs/rm/handling", "/qlhs/rm/handling"],
  ["/qlhs/rm/details", "/qlhs/rm/handling"],
  ["/qlhs/rm/manage", "/qlhs/rm/manage"],
  ["/qlhs/rm/manageDataRecords", "/qlhs/rm/manage"],
]);

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const [data, setData] = useState([]);
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    getSection().then((data) => setData(data));
  }, []);

  const sections = useMemo(() => data, [data]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  }, [router.asPath]);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <img
                  src="/static/images/vib/logo/logoVIB.png"
                  style={{
                    height: 40,
                    width: 68,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>

        <Box sx={{ flexGrow: 1 }}>
          {sections?.map((item) => (
            <DashboardSidebarSection
              key={item.title}
              path={router.pathname}
              sx={{
                mt: 2,
                "& + &": {
                  mt: 2,
                },
              }}
              {...item}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        ></Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
