

import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';


import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from '../../hooks/use-popover';
import { AccountPopover } from './account-popover';
import React from "react"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../constants/route.constants';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const navigate = useNavigate();
  const accountPopover = usePopover();
  const currentPage = useSelector((state) => state.user.currentPage);


  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >

            <Typography sx={{ textTransform: "capitalize" }} >{currentPage}</Typography>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Tổng quan">
              <IconButton onClick={() => navigate(ROUTE_CONSTANTS.HOME_PAGE)}>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <ChartBarIcon />
                  </SvgIcon>
                </Badge>

              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Cài đặt">
              <IconButton onClick={() => navigate(ROUTE_CONSTANTS.SETING_PAGE)}>
                <SvgIcon fontSize="small">
                  <CogIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

