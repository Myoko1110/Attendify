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

import Member from 'src/utils/member';

export default function UserDeleteDialog({
  open,
  setOpen,
  member,
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
          ids: [member.id],
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then(() => {
        setOpen(false);
        updateUsers();
        setDeleteSuccessOpen(true);
      })
      .catch(() => {
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
          {member.lastName} {member.firstName}
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
  member: PropTypes.instanceOf(Member).isRequired,
  updateUsers: PropTypes.func,
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
};
