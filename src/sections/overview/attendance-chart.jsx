import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AttendanceChart({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        borderRadius: 1,
        columnWidth: '70%',
      },
    },

    chart: {
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: 'all',
            columnDelimiter: ',',
            headerCategory: '日にち',
            headerValue: '出席率',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: 'all',
          },
          png: {
            filename: 'all',
          },
        },
      },
      locales: [
        {
          name: 'en',
          options: {
            toolbar: {
              exportToSVG: 'SVGダウンロード',
              exportToPNG: 'PNGダウンロード',
              exportToCSV: 'CSVダウンロード',
            },
          },
        },
      ],
    },
    labels,
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MM/dd',
      },
    },
    tooltip: {
      shared: false,
      intersect: false,
      x: {
        format: 'MM/dd',
      },
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} 人`;
          }
          return value;
        },
      },
    },
    markers: {
      size: 5,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AttendanceChart.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
