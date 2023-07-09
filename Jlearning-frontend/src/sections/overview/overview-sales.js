
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import BarChart from '../../components/BarChart';


export const OverviewSales = ({sales}) => {

  return (
    <Card className='w-full' sx={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;"}} >
      <CardHeader
     
        title="Doanh Thu Theo Khóa Học"
      />
      <CardContent>
        <BarChart sales={sales} />
      </CardContent>
      <Divider />
    </Card>
  );
};
