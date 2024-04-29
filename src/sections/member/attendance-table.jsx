/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

import { Box, Table, TableRow, TableCell, TableHead, TableBody, Typography } from '@mui/material';

import Attendances from 'src/utils/attendances';

export default function AttendanceTable({ attendances }) {
  const theme = useTheme();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>日付</TableCell>
          <TableCell>出欠</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {attendances.map((i, k) => (
          <TableRow
            sx={{
              '& .MuiTableCell-root': {
                height: '48px',
                padding: '0',
              },
            }}
            key={k}
          >
            <TableCell>
              <Typography variant="body2" sx={{ p: '14px' }}>
                {i.date.getFullYear()}/{(i.date.getMonth() + 1).toString().padStart(2, '0')}/
                {i.date.getDate().toString().padStart(2, '0')}
              </Typography>
            </TableCell>
            <TableCell>
              {i.type === '出席' ? (
                <Box width={100} sx={{ borderRadius: 2, py: 1, px: 2, textAlign: 'center' }}>
                  {i.type}
                </Box>
              ) : i.type === '欠席' ? (
                <Box
                  width={100}
                  sx={{ borderRadius: 2, py: 1, px: 2, textAlign: 'center', bgcolor: '#f4c7c3' }}
                >
                  {i.type}
                </Box>
              ) : i.type === '遅刻' || i.type === '早退' ? (
                <Box
                  width={100}
                  sx={{ borderRadius: 2, py: 1, px: 2, textAlign: 'center', bgcolor: '#fce8b2' }}
                >
                  {i.type}
                </Box>
              ) : i.type === '講習' ? (
                <Box
                  width={100}
                  sx={{ borderRadius: 2, py: 1, px: 2, textAlign: 'center', bgcolor: '#b7d2e1' }}
                >
                  {i.type}
                </Box>
              ) : (
                <Box
                  width={100}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    px: 2,
                    textAlign: 'center',
                    bgcolor: theme.palette.grey[300],
                  }}
                >
                  {i.type}
                </Box>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

AttendanceTable.propTypes = {
  attendances: PropTypes.instanceOf(Attendances),
};
