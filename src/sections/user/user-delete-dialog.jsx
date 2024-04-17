import axios from 'axios';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import Button from '@mui/material/Button';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

export default function UserDeleteDialog({
  open,
  setOpen,
  id,
  lastName,
  firstName,
  updateUsers,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
}) {
  const [cookies] = useCookies(['']);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    const { session, userId } = cookies;
    axios
      .delete('http://localhost:8000/api/v1/member/', {
        data: {
          ids: [id],
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then((response) => {
        setOpen(false);
        updateUsers();
        setDeleteSuccessOpen(true);
      })
      .catch((error) => {
        setOpen(false);
        setDeleteErrorOpen(true);
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
    >
      <DialogTitle id="alert-dialog-title" sx={{ padding: '24px' }}>
        以下の部員を本当に削除しますか？
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {lastName} {firstName}
        </DialogContentText>
      </DialogContent>
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

UserDeleteDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.number,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  updateUsers: PropTypes.func,
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
};
