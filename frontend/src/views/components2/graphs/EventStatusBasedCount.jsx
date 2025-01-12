import React, { memo } from 'react';
import ReactApexChart from 'react-apexcharts';
const colors = [
  '#FF5733', // Draft (Vibrant Orange)
  '#33FF57', // Published (Bright Green)
  '#C0392B', // Cancelled (Crimson Red)
  '#F39C12', // Pending (Orange-Yellow)
  '#3498DB', // Archived (Sky Blue)
  '#8E44AD', // In Review (Deep Purple)
];

const EventStatusBasedCount = ({ data }) => {
  const categories = data?.map((item) => item.status) || [];
  const seriesData = data?.map((item) => item.count) || [];

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar',
    },

    xaxis: {
      categories,
      title: {
        text: 'Evet Status',
      },
    },

    yaxis: {
      title: {
        text: 'No. of. Events',
      },
    },

    title: {
      text: 'Event Staus Based Count',
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
        horizontal: false,
        distributed: true,
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
      name: 'Event Count',
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

export default memo(EventStatusBasedCount);
