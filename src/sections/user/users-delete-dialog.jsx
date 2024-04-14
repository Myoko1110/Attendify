import axios from 'axios';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';

export default function UsersDeleteDialog({ open, setOpen, ids, updateUsers, setSelected }) {
  const [cookies] = useCookies(['']);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    const { session, userId } = cookies;
    axios
      .delete('http://localhost:8000/api/v1/member/', {
        data: {
          ids,
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then(() => {
        setOpen(false);
        updateUsers();
        setSelected([]);
      })
      .catch(() => {
        setOpen(false);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '444px',
          borderRadius: '16px',
        },
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ padding: '24px' }}>
        本当に削除しますか？
      </DialogTitle>
      <DialogActions sx={{ p: '24px' }}>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          キャンセル
        </Button>
        <Button onClick={handleDeleteClick} variant="contained" color="error" autoFocus>
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UsersDeleteDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  ids: PropTypes.array,
  updateUsers: PropTypes.func,
  setSelected: PropTypes.func,
};
