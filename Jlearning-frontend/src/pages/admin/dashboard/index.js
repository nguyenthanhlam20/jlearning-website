

import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewBudget } from '../../../sections/overview/overview-budget';
import { OverviewLatestOrders } from '../../../sections/overview/overview-latest-orders';
import { OverviewSales } from '../../../sections/overview/overview-sales';
import { CourseOverView } from '../../../sections/overview/overview-course';
import { OverviewTotalCustomers } from '../../../sections/overview/overview-total-customers';
import { OverviewNews } from '../../../sections/overview/overview-news';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../../redux/userSlice';
import React from 'react';
import SmoothScrollUp from '../../../components/Common/SmoothScrollUp';
import { getData } from '../../../redux/dashboardSlice';


const DashboardPage = () => {
  const now = new Date();
  const dispatch = useDispatch();
  const { setCurrentPage } = userSlice.actions;

  const user = useSelector((state) => state.authen.user);
  React.useEffect(() => {
    dispatch(setCurrentPage("Tổng quan"));
  }, [])



  const data = useSelector((state) => state.dashboard.data);


  React.useEffect(() => {
    dispatch(getData());
  }, [user])

  return <>
    <SmoothScrollUp />
    <Box
      className='ml-72'
      component="main"
      sx={{
        flexGrow: 1,
        py: 5
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
              value={data?.total_amount}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
              value={data?.total_user}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CourseOverView
              sx={{ height: '100%', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
              value={data?.total_course}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewNews
              sx={{ height: '100%', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
              value={data?.total_blog}
            />
          </Grid>
          <Grid
            xs={12}
            lg={12}
            md={12}
            sm={12}
          >
            <OverviewSales sales={data?.total_money_by_course} />
          </Grid>
          <Grid
            xs={12}
            lg={12}
            md={12}
            sm={12}
          >
            <OverviewLatestOrders
              payments={data?.top_orders}
              sx={{ height: '100%', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
}

export default DashboardPage;