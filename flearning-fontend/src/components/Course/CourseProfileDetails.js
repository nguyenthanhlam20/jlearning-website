import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid
} from '@mui/material';
import AppInput from '../AppInput/AppInput';
import AppCheckBox from '../AppInput/AppCheckBox';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

export const CourseProfileDetails = ({handleChangeValue, values}) => {
  

  return (
    <Card sx={{ ml: 2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} >

      <CardContent className='h-[394px]' sx={{ pb: 5 }} >
        <CardHeader title="Thông tin khóa học" />
        <Grid
          container
          spacing={3}
        >
          <Grid

            xs={12}
            md={6}
          >
            <AppInput height={""} value={values?.course_name} title={"course_name"} handleChangeValue={handleChangeValue} placeholder={"Tên khóa học"} />
          </Grid>
     
          <Grid
            xs={12}
            md={6}
          >
            <AppInput height={""} value={values?.duration} title={"duration"} handleChangeValue={handleChangeValue} placeholder={"Thời gian học (tháng)"} />
          </Grid>
          <Grid
            xs={12}
            md={6}
          >
            <AppInput height={""} value={values?.price} title={"price"} handleChangeValue={handleChangeValue} placeholder={"Giá (vnd)"} />
          </Grid>
          <Grid
            xs={12}
            md={6}
          >
            <AppCheckBox value={values?.status}  handleChangeValue={handleChangeValue} title={"status"} placeholder={"Trạng thái"} />
          </Grid>
          <Grid
            xs={12}
            md={12}
            
          >
            <AppInput height={"h-[100px]"} value={values?.description} title={"description"} handleChangeValue={handleChangeValue} placeholder={"Mô tả khóa học"} />
          </Grid>

        </Grid>
      </CardContent>
      <Divider />
    </Card>

  );
};
