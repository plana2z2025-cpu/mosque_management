import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ExpenseStatusGraph = ({ data }) => {
  // Extract labels and data for the chart
  const chartLabels = data?.map((item) => item.status) || [];
  const chartData = data?.map((item) => item.count) || [];

  // Chart configuration
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: chartLabels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    colors: ['#28a745', '#ffc107'],
    fill: {
      type: 'gradient',
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      show: true,
    },
    title: {
      text: 'Expense Status',
      align: 'center',
    },
  };

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartData} type="donut" height={350} />
    </div>
  );
};

export default ExpenseStatusGraph;
