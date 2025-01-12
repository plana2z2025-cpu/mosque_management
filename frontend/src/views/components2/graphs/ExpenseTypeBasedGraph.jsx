import React, { memo } from 'react';
import ReactApexChart from 'react-apexcharts';
const colors = [
  '#FF5733', // Vibrant Orange
  '#33FF57', // Bright Green
  '#3357FF', // Rich Blue
  '#FF33A6', // Hot Pink
  '#FFC300', // Golden Yellow
  '#8E44AD', // Deep Purple
  '#3498DB', // Sky Blue
  '#E74C3C', // Bright Red
  '#1ABC9C', // Teal
  '#F39C12', // Orange-Yellow
  '#2ECC71', // Soft Green
  '#9B59B6', // Soft Purple
  '#34495E', // Steel Blue
  '#C0392B', // Crimson Red
  '#7F8C8D', // Cool Gray
];

const ExpenseTypeBasedGraph = ({ data }) => {
  const categories = data?.map((item) => item.expenseType) || [];
  const seriesData = data?.map((item) => item.count) || [];

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar',
    },

    xaxis: {
      categories,
      title: {
        text: 'No. of. Expenses',
      },
    },

    title: {
      text: 'Expense Type Based Count',
      align: 'center',
    },

    colors,

    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
      },
    },

    yaxis: {
      title: {
        text: 'Expenses',
      },
    },

    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 10,
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };

  const series = [
    {
      name: 'Expenses Count',
      data: seriesData,
    },
  ];
  return (
    <div>
      {' '}
      <ReactApexChart options={chartOptions} series={series} type="bar" height={350} />
    </div>
  );
};

export default memo(ExpenseTypeBasedGraph);
