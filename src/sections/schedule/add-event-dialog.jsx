import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import { grey } from '@mui/material/colors';
import {
  Stack,
  Alert,
  Dialog,
  Button,
  Snackbar,
  TextField,
  DialogTitle,
  FormControl,
  ToggleButton,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
} from '@mui/material';

import { info, error, success, warning } from 'src/theme/palette';

export default function EventAddDialog({ isOpen, setIsOpen, date, setEvents }) {
  const [schedule, setSchedule] = useState('');
  const [otherSchedule, setOtherSchedule] = useState('');

  const [addSuccessSnackbarOpen, setAddSuccessSnackbarOpen] = useState(false);
  const [addErrorSnackbarOpen, setAddErrorSnackbarOpen] = useState(false);

  const [isError, setIsError] = useState(false);

  const [cookies] = useCookies(['']);

  const resetInputs = () => {
    setIsError(false);
    setSchedule('');
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!schedule) {
      setIsError(true);
    } else {
      const { session, userId } = cookies;

      let scheduleType;
      if (schedule === 'OTHER') {
        scheduleType = otherSchedule;
      } else {
        scheduleType = schedule;
      }

      axios
        .post('http://localhost:8000/api/v1/schedule/', {
          userId: userId.replace('_', ''),
          token: session,
          date: Number(date.getTime() / 1000),
          scheduleType,
        })
        .then(() => {
          setIsOpen(false);
          resetInputs();
          setAddSuccessSnackbarOpen(true);

          const item = {
            start: date,
            allDay: true,
            extendedProps: {
              scheduleType,
            },
          };
          switch (schedule) {
            case 'WEEKDAY':
              item.title = '平日練習';
              item.color = info.lighter;
              item.textColor = info.dark;
              break;
            case 'MORNING':
              item.title = '午前練習';
              item.color = success.lighter;
              item.textColor = success.dark;
              break;
            case 'AFTERNOON':
              item.title = '午後練習';
              item.color = warning.lighter;
              item.textColor = warning.dark;
              break;
            case 'ALLDAY':
              item.title = '一日練習';
              item.color = error.lighter;
              item.textColor = error.dark;
              break;
            default:
              item.title = schedule;
              item.color = grey[400];
              item.textColor = grey[800];
              break;
          }

          setEvents((pre) => [...pre, item]);
        })
        .catch(() => {
          setIsOpen();
          setAddErrorSnackbarOpen(true);
        });
    }
  };

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
  };

  const handleChancelClick = () => {
    setIsOpen(false);
    resetInputs();
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
        onClose={handleChancelClick}
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
                    sx={{
                      bgcolor: info.lighter,
                      '&:hover': { bgcolor: info.light },
                      '&.Mui-selected': {
                        bgcolor: info.main,
                        color: 'white',
                        '&:hover': { bgcolor: info.main },
                      },
                    }}
                  >
                    平日練習
                  </ToggleButton>
                  <ToggleButton
                    value="MORNING"
                    sx={{
                      bgcolor: success.lighter,
                      '&:hover': { bgcolor: success.light },
                      '&.Mui-selected': {
                        bgcolor: success.main,
                        color: 'white',
                        '&:hover': { bgcolor: success.main },
                      },
                    }}
                  >
                    午前練習
                  </ToggleButton>
                  <ToggleButton
                    value="AFTERNOON"
                    sx={{
                      bgcolor: warning.lighter,
                      '&:hover': { bgcolor: warning.light },
                      '&.Mui-selected': {
                        bgcolor: warning.main,
                        color: 'white',
                        '&:hover': { bgcolor: warning.main },
                      },
                    }}
                  >
                    午後練習
                  </ToggleButton>
                  <ToggleButton
                    value="ALLDAY"
                    sx={{
                      bgcolor: error.lighter,
                      '&:hover': { bgcolor: error.light },
                      '&.Mui-selected': {
                        bgcolor: error.main,
                        color: 'white',
                        '&:hover': { bgcolor: error.main },
                      },
                    }}
                  >
                    一日練習
                  </ToggleButton>
                  <ToggleButton
                    value="OTHER"
                    sx={{
                      bgcolor: grey[200],
                      '&:hover': { bgcolor: grey[300] },
                      '&.Mui-selected': {
                        bgcolor: grey[500],
                        color: 'white',
                        '&:hover': { bgcolor: grey[700] },
                      },
                    }}
                  >
                    その他
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
              <FormControl>
                <TextField
                  value={otherSchedule}
                  onChange={(e) => setOtherSchedule(e.target.value)}
                  variant="standard"
                  placeholder="その他を入力してください"
                />
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
  setEvents: PropTypes.func,
};
