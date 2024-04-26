import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';

import Attendance from 'src/utils/attendance';

export default function AttendanceDeleteDialog({
  isOpen,
  setIsOpen,
  attendance,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
}) {
  const [cookies] = useCookies(['']);

  const handleClick = async () => {
    await attendance
      .delete(cookies)
      .then(() => {
        attendance.id = -1;
        setIsOpen(false);
        setDeleteSuccessOpen(true);
      })
      .catch((e) => {
        console.log(e);
        setIsOpen(false);
        setDeleteErrorOpen(true);
      });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '16px',
        },
      }}
    >
      <DialogTitle>この出欠情報を本当に削除しますか？</DialogTitle>
      <DialogActions sx={{ p: '24px' }}>
        <Button onClick={() => setIsOpen(false)} variant="outlined" color="inherit">
          キャンセル
        </Button>
        <Button onClick={handleClick} variant="contained" color="error" autoFocus>
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AttendanceDeleteDialog.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  attendance: PropTypes.instanceOf(Attendance),
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
};
