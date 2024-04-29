import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Chart from 'src/components/chart/chart';

// ----------------------------------------------------------------------

export default function RateWidgetSummary({ title, subValue, value, icon, sx, ...other }) {
  const theme = useTheme();
  const renderValue = () => {
    if (!value) {
      return 'データなし';
    }
    return `${value.toFixed(2)}%`;
  };
  const renderSubValue = () => {
    if (subValue) {
      return `(${subValue.toFixed(2)}%)`;
    }
    return null;
  };

  let series;
  if (value) series = [value, 100 - value];
  else series = [0, 100];

  const chartOptions = {
    labels: ['A', 'N'],
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
            value: {
              show: false,
            },
          },
        },
      },
    },
    fill: {
      colors: [theme.palette.primary.main, theme.palette.grey[300]],
    },
  };

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 84, height: 84 }}>
        <Chart dir="ltr" type="donut" series={series} options={chartOptions} width="100%" />
      </Box>

      <Stack spacing={0.5} direction="column" justifyContent="center">
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
        <Stack direction="row" gap={1} alignItems="end">
          <Typography variant="h4">{renderValue()}</Typography>
          <Typography variant="body2">{renderSubValue()}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

RateWidgetSummary.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  subValue: PropTypes.number,
  value: PropTypes.number,
};
