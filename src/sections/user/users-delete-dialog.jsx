import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import Button from '@mui/material/Button';
import { Alert, Dialog, Snackbar, DialogTitle, DialogActions } from '@mui/material';

import instance from 'src/utils/api';

export default function UsersDeleteDialog({
  open,
  setOpen,
  ids,
  updateUsers,
  setSelected,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
}) {
  const [cookies] = useCookies(['']);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
  };
  const handleErrorSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  const handleDeleteClick = () => {
    const { session, userId } = cookies;
    instance
      .delete('/api/v1/member/', {
        data: {
          ids,
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then(() => {
        updateUsers();
        setSelected([]);
        setOpen(false);
        setDeleteSuccessOpen(true);
      })
      .catch(() => {
        setOpen(false);
        setDeleteErrorOpen(true);
      });
  };

  return (
    <>
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
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={successSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert severity="success" onClose={handleSuccessSnackbarClose}>
          部員を削除しました。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert severity="error" onClose={handleErrorSnackbarClose}>
          削除に失敗しました。
        </Alert>
      </Snackbar>
    </>
  );
}

UsersDeleteDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  ids: PropTypes.array,
  updateUsers: PropTypes.func,
  setSelected: PropTypes.func,
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
};
