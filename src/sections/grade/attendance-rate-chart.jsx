import PropTypes from 'prop-types';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AttendanceRateChart({ chart, gradeName }) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    labels,
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MM/dd',
      },
      range: 5184000000,
    },
    yaxis: {
      max: 100,
      min: 0,
    },
    stroke: {
      curve: 'straight',
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        format: 'MM/dd',
      },
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} %`;
          }
          return value;
        },
      },
    },
    chart: {
      toolbar: {
        show: true,
        autoSelected: 'zoom',
        export: {
          csv: {
            filename: gradeName,
            columnDelimiter: ',',
            headerCategory: '日にち',
            headerValue: '出席率',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: gradeName,
          },
          png: {
            filename: gradeName,
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
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
    },
    markers: {
      size: 4,
    },
    ...options,
  });

  return (
    <Chart dir="ltr" type="area" series={series} options={chartOptions} width="100%" height={350} />
  );
}

AttendanceRateChart.propTypes = {
  chart: PropTypes.object,
  gradeName: PropTypes.string,
};
