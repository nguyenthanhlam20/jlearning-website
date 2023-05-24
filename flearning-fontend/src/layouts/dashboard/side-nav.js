import {Link} from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,

} from '@mui/material';
import { Logo } from "../../components/Logo";
import { Scrollbar } from "../../components/ScrollBar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useLocation, useNavigate } from "react-router-dom";

export const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: '#6C737F'
        },
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={Link}
            href="/"

          >
            <Logo />
          </Box>

        </Box>
        <Divider sx={{ borderColor: '#2F3746' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (location.pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: '#2F3746' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >



        </Box>
      </Box>
    </Scrollbar>
  );



  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        sx: {
          backgroundColor: "#1C2536",
          color: "#ffffff",
          width: 280
        }
      }}
      variant="permanent"
    >
      {content}
    </Drawer>
  );
};
