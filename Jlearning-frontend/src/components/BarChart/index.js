import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
const BarChart = ({ sales }) => {

  let amount = [];
  let course = [];

  for (let i = 0; i < sales?.length; i++) {
    amount.push(sales[i].total_amount);
    course.push(sales[i].course_name);
  }

  console.log("amount: ", amount);
  console.log("course: ", course);

  const [series] = useState([
    {
      name: "Doanh thu",
      data: amount,
    },
  ]);

  const [options] = useState({
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
      },

    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      offsetX: 0,
      formatter: function (val, opt) {
        return  new Intl.NumberFormat('vi-VN').format(Number(val)) + '₫';
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          // Customize the tooltip value as per your requirement
          return new Intl.NumberFormat('vi-VN').format(Number(value)) + '₫';
        },
      },
    },
    xaxis: {
      categories: course,
      labels: {
        formatter: function (value) {
          // Customize the display value as per your requirement
          return new Intl.NumberFormat('vi-VN').format(Number(value)) + '₫';
        },
      },
    },
    
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default BarChart;
