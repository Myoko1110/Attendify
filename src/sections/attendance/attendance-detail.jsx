import PropTypes from 'prop-types';

import {
  Table,
  Dialog,
  Button,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

import Attendances from 'src/utils/attendances';

import AttendanceTableRow from './attendance-table-row';

export default function AttendanceDetail({ isOpen, setIsOpen, attendances, updateAttendances }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '880px',
          borderRadius: '16px',
        },
      }}
    >
      <DialogTitle sx={{ padding: '24px' }}>
        {attendances[0].date.getMonth() + 1}月{attendances[0].date.getDate()}日の出欠
      </DialogTitle>
      <DialogContent sx={{ overflow: 'auto' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>パ</TableCell>
                <TableCell>名前</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>出欠</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {attendances.map((row, index) => (
                <AttendanceTableRow
                  attendance={row}
                  key={index}
                  updateAttendances={updateAttendances}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ p: '24px' }}>
        <Button variant="outlined" color="inherit" onClick={() => setIsOpen(false)}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AttendanceDetail.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  attendances: PropTypes.instanceOf(Attendances),
  updateAttendances: PropTypes.func,
};
