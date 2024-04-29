import PropTypes from 'prop-types';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AttendanceRateChart({ chart }) {
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
        format: 'MM月',
      },
      categories: [
        '01月',
        '02月',
        '03月',
        '04月',
        '05月',
        '06月',
        '07月',
        '08月',
        '09月',
        '10月',
        '11月',
        '12月',
      ],
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
        format: 'MM月',
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
            columnDelimiter: ',',
            headerCategory: '月',
            headerValue: '出席率',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
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
      size: 5,
    },
    ...options,
  });

  return (
    <Chart dir="ltr" type="area" series={series} options={chartOptions} width="100%" height={350} />
  );
}

AttendanceRateChart.propTypes = {
  chart: PropTypes.object,
};
