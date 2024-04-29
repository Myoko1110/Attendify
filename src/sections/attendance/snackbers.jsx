import { PropTypes } from 'prop-types';

import { Alert, Snackbar } from '@mui/material';

export default function Snackbars({
  deleteSuccessOpen,
  deleteErrorOpen,
  editSuccessOpen,
  editErrorOpen,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
  setEditSuccessOpen,
  setEditErrorOpen,
}) {
  const handleDeleteSuccessClose = () => {
    setDeleteSuccessOpen(false);
  };
  const handleDeleteErrorClose = () => {
    setDeleteErrorOpen(false);
  };

  const handleEditSuccessClose = () => {
    setEditSuccessOpen(false);
  };
  const handleEditErrorClose = () => {
    setEditErrorOpen(false);
  };

  return (
    <>
      {/* 削除 */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={deleteSuccessOpen}
        autoHideDuration={5000}
        onClose={handleDeleteSuccessClose}
      >
        <Alert
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleDeleteSuccessClose}
        >
          出欠情報を削除しました。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={deleteErrorOpen}
        autoHideDuration={5000}
        onClose={handleDeleteErrorClose}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleDeleteErrorClose}
        >
          削除に失敗しました。
        </Alert>
      </Snackbar>

      {/* 編集 */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={editSuccessOpen}
        autoHideDuration={5000}
        onClose={handleEditSuccessClose}
      >
        <Alert
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleEditSuccessClose}
        >
          変更を保存しました。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={editErrorOpen}
        autoHideDuration={3000}
        onClose={handleEditErrorClose}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleEditErrorClose}
        >
          保存に失敗しました。
        </Alert>
      </Snackbar>
    </>
  );
}

Snackbars.propTypes = {
  deleteSuccessOpen: PropTypes.bool,
  deleteErrorOpen: PropTypes.bool,
  editSuccessOpen: PropTypes.bool,
  editErrorOpen: PropTypes.bool,
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
  setEditSuccessOpen: PropTypes.func,
  setEditErrorOpen: PropTypes.func,
};
