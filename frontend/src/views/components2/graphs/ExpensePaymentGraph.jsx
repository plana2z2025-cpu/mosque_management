import React, { memo } from 'react';
import ReactApexChart from 'react-apexcharts';

const ExpensePaymentGraph = ({ data }) => {
  // Extract labels and data for the chart
  const chartLabels = data?.map((item) => item.mode) || [];
  const chartData = data?.map((item) => item.count) || [];

  // Chart configuration
  const chartOptions = {
    chart: {
      type: 'pie',
      width: 380,
    },
    labels: chartLabels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    fill: {
      type: 'gradient',
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      show: true,
    },
    title: {
      text: 'Payment Method',
      align: 'center',
    },
  };

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartData} type="pie" height={350} />
    </div>
  );
};

export default memo(ExpensePaymentGraph);
