import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

import { Box, Popover, TableRow, MenuItem, TableCell, Typography, IconButton } from '@mui/material';

import Attendance from 'src/utils/attendance';

import Iconify from 'src/components/iconify';

import AttendanceEditDialog from './attendance-edit-dialog';
import AttendanceDeleteDialog from './attendance-delete-dialog';

export default function AttendanceTableRow({
  attendance,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
  setEditSuccessOpen,
  setEditErrorOpen,
}) {
  const [open, setOpen] = useState('');

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const theme = useTheme();

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
        <TableCell>{attendance.part}</TableCell>
        <TableCell sx={{ minWidth: 120 }}>
          <Typography variant="subtitle1">
            {attendance.lastName} {attendance.firstName}
          </Typography>
        </TableCell>

        <TableCell width={116}>{renderAttendance(attendance.type)}</TableCell>

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
          <MenuItem
            onClick={() => {
              setEditOpen(true);
              setOpen(false);
            }}
          >
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
        setDeleteSuccessOpen={setDeleteSuccessOpen}
        setDeleteErrorOpen={setDeleteErrorOpen}
      />
      <AttendanceEditDialog
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        attendance={attendance}
        setEditSuccessOpen={setEditSuccessOpen}
        setEditErrorOpen={setEditErrorOpen}
      />
    </>
  );
}

AttendanceTableRow.propTypes = {
  attendance: PropTypes.instanceOf(Attendance),
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
  setEditSuccessOpen: PropTypes.func,
  setEditErrorOpen: PropTypes.func,
};
