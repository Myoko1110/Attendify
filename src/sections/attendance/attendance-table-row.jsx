import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';

import { Box, Popover, TableRow, MenuItem, TableCell, Typography, IconButton } from '@mui/material';

import Attendance from 'src/utils/attendance';

import Iconify from 'src/components/iconify';

import AttendanceDeleteDialog from './attendance-delete-dialog';

export default function AttendanceTableRow({ attendance, updateAttendances }) {
  const [name, setName] = useState('');
  const [part, setPart] = useState('');
  const [open, setOpen] = useState('');

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [cookies] = useCookies(['']);

  const theme = useTheme();

  useEffect(() => {
    attendance.getUser(cookies).then((res) => {
      if (!res) {
        setName('不明');
      } else {
        setName(`${res.lastName} ${res.firstName}`);
        setPart(res.part);
      }
    });
  });

  const renderAttendance = (type) => {
    switch (type) {
      case '出席':
        return (
          <Box width={100} sx={{ borderRadius: 2, py: 1, px: 2, textAlign: 'center' }}>
            {type}
          </Box>
        );
      case '欠席':
        return (
          <Box
            width={100}
            sx={{ borderRadius: 2, py: 1, px: 2, textAlign: 'center', bgcolor: '#f4c7c3' }}
          >
            {type}
          </Box>
        );
      case '遅刻':
        return (
          <Box
            width={100}
            sx={{ borderRadius: 2, py: 1, px: 2, textAlign: 'center', bgcolor: '#fce8b2' }}
          >
            {type}
          </Box>
        );
      case '早退':
        return (
          <Box
            width={100}
            sx={{ borderRadius: 2, py: 1, px: 2, textAlign: 'center', bgcolor: '#fce8b2' }}
          >
            {type}
          </Box>
        );
      case '講習':
        return (
          <Box
            width={100}
            sx={{ borderRadius: 2, py: 1, px: 2, textAlign: 'center', bgcolor: '#b7d2e1' }}
          >
            {type}
          </Box>
        );
      default:
        return (
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
            {type}
          </Box>
        );
    }
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ p: '8px' }}>{part}</TableCell>
        <TableCell sx={{ p: '8px', minWidth: 150 }}>
          <Typography variant="subtitle1">{name}</Typography>
        </TableCell>

        <TableCell sx={{ p: '8px' }} width={116}>
          {renderAttendance(attendance.type)}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>

        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: {
              sx: { width: 140 },
            },
          }}
        >
          <MenuItem>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            編集
          </MenuItem>

          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              setDeleteOpen(true);
              setOpen(false);
            }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            削除
          </MenuItem>
        </Popover>
      </TableRow>
      <AttendanceDeleteDialog
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
        attendance={attendance}
        updateAttendances={updateAttendances}
      />
    </>
  );
}

AttendanceTableRow.propTypes = {
  attendance: PropTypes.instanceOf(Attendance),
  updateAttendances: PropTypes.func,
};
