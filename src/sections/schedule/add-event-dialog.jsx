import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import {
  Stack,
  Alert,
  Dialog,
  Button,
  Snackbar,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

export default function EventAddDialog({ isOpen, setIsOpen, date, events }) {
  const [schedule, setSchedule] = useState('');

  const [addSuccessSnackbarOpen, setAddSuccessSnackbarOpen] = useState(false);
  const [addErrorSnackbarOpen, setAddErrorSnackbarOpen] = useState(false);

  const [isError, setIsError] = useState(false);

  const [cookies] = useCookies(['']);

  const resetInputs = () => {
    setIsError(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!schedule) {
      setIsError(true);
    } else {
      const { session, userId } = cookies;
      axios
        .post('http://localhost:8000/api/v1/member/', {
          userId: userId.replace('_', ''),
          token: session,
        })
        .then((response) => {
          setIsOpen(false);
          resetInputs();
          setAddSuccessSnackbarOpen(true);
        })
        .catch((error) => {
          setIsOpen(false);
          setAddErrorSnackbarOpen(true);
        });
    }
  };

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
  };

  const handleChancelClick = () => {
    setIsOpen(false);
    setSchedule('');
  };

  const handleSuccessSnackbarClose = () => {
    setAddSuccessSnackbarOpen(false);
  };
  const handleErrorSnackbarClose = () => {
    setAddErrorSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '444px',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle sx={{ padding: '24px' }}>
          {date.getMonth() + 1}月{date.getDate()}日の予定を追加
        </DialogTitle>
        <form onSubmit={handleClick}>
          <DialogContent sx={{ paddingTop: '10px!important' }}>
            <Stack direction="column" gap="24px">
              {isError && <Alert severity="error">未入力の項目があります。</Alert>}
              <FormControl>
                <ToggleButtonGroup
                  variant="outlined"
                  value={schedule}
                  onChange={handleScheduleChange}
                  fullWidth
                >
                  <ToggleButton
                    value="WEEKDAY"
                    sx={{ bgcolor: '#e6f6fc', '&.Mui-selected': { bgcolor: '#aed6e6' } }}
                  >
                    平日練習
                  </ToggleButton>
                  <ToggleButton
                    value="MORNING"
                    sx={{ bgcolor: '#ebfce6', '&.Mui-selected': { bgcolor: '#a3d494' } }}
                  >
                    午前練習
                  </ToggleButton>
                  <ToggleButton
                    value="AFTERNOON"
                    sx={{ bgcolor: '#fcf7e6', '&.Mui-selected': { bgcolor: '#edd687' } }}
                  >
                    午後練習
                  </ToggleButton>
                  <ToggleButton
                    value="ALLDAY"
                    sx={{ bgcolor: '#fce6e6', '&.Mui-selected': { bgcolor: '#e08d8d' } }}
                  >
                    一日練習
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: '24px' }}>
            <Button variant="outlined" color="inherit" onClick={handleChancelClick}>
              キャンセル
            </Button>
            <Button variant="contained" color="inherit" type="submit">
              保存
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={addSuccessSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleSuccessSnackbarClose}
        >
          部員を追加しました。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={addErrorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleErrorSnackbarClose}
        >
          追加に失敗しました。
        </Alert>
      </Snackbar>
    </>
  );
}
EventAddDialog.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  date: PropTypes.any,
  events: PropTypes.array,
};
